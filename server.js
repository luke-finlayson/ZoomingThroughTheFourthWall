const express = require("express");
const app = express();
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 443;
const SocketEvents = require('./socketevents');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const TextRecognition = require("./textRecognition");
const { DataService, User, Message } = require("./dataService");
const cors = require('cors');
app.use(cors());

// Create an HTTPS server with the given credentials and Express instance
var server;

// Create HTTPS server with SSL key and cert if built for production
if (process.env.NODE_ENV === "production") {
  server = https.createServer({
    key: fs.readFileSync('keys/privkey.pem', 'utf-8'),
    cert: fs.readFileSync('keys/fullchain.pem', 'utf-8')
  }, app);
}
// Otherwise, create an HTTP server
else {
  server = http.createServer(app);
}

const peerServer = ExpressPeerServer(server, {
  debug: true,
  secure: true
});

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// The postgres interface
const dataService = new DataService();

app.use('/peerjs', peerServer);

// Create text recognition tool
const textRecognition = new TextRecognition();

if (process.env.NODE_ENV === "production")
  app.use(express.static(path.join(__dirname, '/public/build')));

const directToHome = (response) => {
  if (process.env.NODE_ENV !== "production")
    response.send('The server is indeed working.')
  else
    response.sendFile(path.join(__dirname, '/public/build/index.html'));
}

// Serve different responses depending on whether production is enabled or not
app.get('/', (_request, response) => {
  directToHome(response);
});

app.get('/room', (_request, response) => {
  directToHome(response);
})

io.on(SocketEvents.Connection, (socket) => {

  socket.on(SocketEvents.CheckRoomId, (roomId, callback) => {

    // Get array of existing rooms
    var rooms = io.of("/").adapter.rooms;

    // Return error if room id wasn't provided
    if (!roomId) {
      callback("Null")
      return;
    }
    // Return error if room doesn't exist.
    if (!rooms.has(roomId)) {
      callback("Does Not Exist");
      return;
    }

    // Otherwise, room with that ID exists
    callback("Exists")

  });

  socket.on(SocketEvents.JoinRoom, (roomID, userId, username, callback) => {

    var rooms = io.of("/").adapter.rooms;
    var roomExisted = rooms.has(roomID);

    const putUserInRoom = () => {
      dataService.insertUserIntoRoom(userId, roomID, (error) => actAndCallbackGracefully(error, callback));
    }

    var user = new User(userId, username);
    dataService.insertUser(user, (error) => {
      if (error) {
        actAndCallbackGracefully(error, callback);
        return;
      }
      else {
        console.log(`This room already exists: ${roomExisted}`)
        // Insert room to database if it doesn't already exist
        // and put user in the new room
        if (!roomExisted) {
          console.log('Room does not yet exist!');

          dataService.insertRoom(roomID, (error) => {
            if (error) {
              actAndCallbackGracefully(error, callback);
              return;
            }
            else {
              putUserInRoom();
            }
          });
        }

        // Otherwise just put the user in the room that already exists
        else {
          putUserInRoom();
        }
      }
    });

    // Join the room with room id
    socket.join(roomID);

    // Only announce to connected clients the existence of this client when it
    // is ready for peer calls
    socket.on(SocketEvents.PeerReady, () => {
      // Broadcast new member to members of room
      socket.to(roomID).emit(SocketEvents.UserJoinedRoom, userId, username);
    })

    // Save message to database and notify all other clients in room
    socket.on(SocketEvents.NewMessage, (content) => {
      // Create a new message object
      var message = new Message(userId, username, roomID, content);
      // Send the message to all users
      io.to(roomID).emit(SocketEvents.NewMessage, message);
      // Insert the message into the database
      dataService.insertMessage(message);

      console.log("Message received from " + username + ": " + content);
    });

    socket.on(SocketEvents.ClearMessages, () => {
      // Delete messages from database
      dataService.deleteMessages(roomID);
      // Tell connected clients to clear their messages
      io.to(roomID).emit(SocketEvents.ClearMessages);
    })

    // Disconnect socket when leave room button is pressed
    socket.on(SocketEvents.LeaveRoom, () => {
      socket.disconnect();

      if (!rooms.has(roomID)) 
        dataService.deleteRoom(roomID);
    });

    // This can be used as SocketEvents.LeaveRoom instead
    socket.on(SocketEvents.Disconnect, () => {
      // Notify other users that the user disconnected
      socket.to(roomID).emit(SocketEvents.UserLeftRoom, userId);
    });
  });

  // Returns the participants in the room with the given ID
  socket.on(SocketEvents.GetRoomParticipants, (roomID, callback) => {
    dataService.getUsersInRoom(roomID, (error, result) => {
      try {
        if (error) {
          callback({ status: "Failed" });
          return;
        }

        callback({ status: "Success", payload: result })
      }

      catch { callback({ status: "Failed" }); }
    })
  });

  // Receive a base-64 encoded image, decode it and then perform text recognition on it
  // and return the extracted text and the vertices for each extraction
  socket.on(SocketEvents.FindImageText, async (image64, callback) => {
    if (!image64) {
      callback({ status: "Failed", error: "Image not provided." })
      return;
    }

    try {
      var result = await textRecognition.getTextData(image64);

      if (!result)
        callback({ status: "Success", response: "No text found." });
      else
        callback({ status: "Success", response: result })
    }
    catch (error) {
      console.log(error);
      callback({ status: "Failed", error: "Could not successfully perform text recognition." })
    }
  });

  // Get all messages sent previously in the given room
  socket.on(SocketEvents.GetMessageHistory, (roomID, callback) => {
    dataService.getMessages(roomID, (error, result) => {
      try {
        if (error) {
          callback({ status: "Failed" });
          return;
        }

        callback({ status: "Success", payload: result })
      }

      catch { callback({ status: "Failed" }); }
    });
  });
});

server.listen(port, () => {
    console.log(`Fourth Wall listening on port ${port}`)
});

// Helper callback
const actAndCallbackGracefully = (error, callback, action) => {
  try {
    if (error) {
      console.log(`There was a problem! ${error}`);
      callback({ status: "Failed" });
      return;
    }

    if (action)
      action()

    callback({ status: "Success" });
  }

  catch {}
}
