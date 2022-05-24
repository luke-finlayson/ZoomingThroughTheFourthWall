const express = require("express");
const app = express();
const https = require('https');
const fs = require('fs');
const port = 8080;
const SocketEvents = require('./socketevents')
const production = false;

// Get the key and certificate require for HTTPS
const credentials = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
};

// Create an HTTPS server with the given credentials and Express instance
const server = https.createServer(credentials, app);
const { Server } = require('socket.io');
const io = new Server(server);

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

  socket.on(SocketEvents.Disconnect, () => {
        console.log('A user has disconnected.')
    });
});

app.listen(port, () => {
    console.log(`Fourth Wall listening on port ${port}`)
}); 
