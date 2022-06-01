const express = require("express");
const app = express();
const https = require('https');
const fs = require('fs');
const port = 8080;
const SocketEvents = require('./socketevents');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const TextRecognition = require("./textRecognition");
const production = false;
const cors = require('cors');
app.use(cors());

// Get the key and certificate require for HTTPS
const credentials = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
};

// Create an HTTPS server with the given credentials and Express instance
const server = https.createServer(credentials, app);
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

app.use('/peerjs', peerServer);

// Create text recognition tool
const textRecognition = new TextRecognition();

if (production == true)
  app.use(express.static(path.join(__dirname, '/public/build')));

// Serve different responses depending on whether production is enabled or not
app.get('/', (_request, response) => {
    if (production == false)
        response.send('The server is indeed working.')
    else
        response.send(path.join(__dirname, '/public/build/index.html'))
});

io.on(SocketEvents.Connection, (socket) => {
  console.log('A user has connected.');

  // This can be used as SocketEvents.LeaveRoom instead
  socket.on(SocketEvents.Disconnect, () => {
    console.log('A user has disconnected.');


  });

  socket.on(SocketEvents.CreateRoom, (roomName) => {
    if (!roomName) {
      callback({ status: "Failed", error: "Room name not provided." })
      return;
    }

    const rooms = io.of("/").adapter.rooms;

    // Return error if room duplication attempted.
    if (!rooms.has(roomName)) {
      callback({ status: "Failed", error: "Room with that name already exists." });
      return;
    }

    // Join creates a new room if one doesn't already exist with this name
    socket.join(roomName)
  });

  socket.on(SocketEvents.JoinRoom, (roomID, userId) => {
    if (!roomID) {
      callback({ status: "Failed", error: "RoomID not provided." })
      return;
    }

    socket.join(roomID);
    socket.to(roomID).emit(SocketEvents.UserJoinedRoom, userId);

    socket.on(SocketEvents.NewMessage, (author, message) => {
      // Save message to database and notify all other clients in room
      io.to(roomID).emit(SocketEvents.NewMessage, author, message, userId);

      console.log("Message received from " + author + ": " + message);
    });
  });

  // Receive a base-64 encoded image, decode it and then perform text recognition on it
  // and return the extracted text and the vertices for each extraction
  socket.on(SocketEvents.FindImageText, async (image64) => {
    if (!image64) {
      callback({ status: "Failed", error: "Image not provided." })
      return;
    }

    try {
      var result = await textRecognition.getTextData(image64);
      callback({ status : "ok", response : result })
    }
    catch (error) {
      console.log(error);
      callback({ status : "Failed", error : "Could not successfully perform text recognition."})
    }
  })
});

// Notify members of given room when client joins
/*io.of("/").adapter.on("join-room", (room, id) => {
  // Do not notify room members if it is the socket's default room
  if (room === id)
    return;

  io.to(room).emit(SocketEvents.UserJoinedRoom, id);
});*/

// Notify members of given room when client leaves
io.of("/").adapter.on("leave-room", (room, id) => {
  // Do not notify room members if it is the socket's default room
  if (room === id)
    return;

  io.to(room).emit(SocketEvents.UserLeftRoom, id)
})

server.listen(port, () => {
    console.log(`Fourth Wall listening on port ${port}`)
});

// Log peer connections
peerServer.on('connection', (client) => {
  console.log("User connected to peer server with id: " + client.id);
})

peerServer.on('disconnect', (client) => {
  console.log("User disconnected from peer server: " + client.id);
})
