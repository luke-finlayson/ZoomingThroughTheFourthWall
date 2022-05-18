const express = require("express");
const app = express();
const https = require('https');
const fs = require('fs');
const port = 8080;

// Get the key and certificate require for HTTPS
const credentials = {
  key: fs.readFileSync('keys/key.pem'),
  cert: fs.readFileSync('keys/cert.pem')
};

// Create an HTTPS server with the given credentials and Express instance
const server = https.createServer(credentials, app).listen(port);
const { Server } = require('socket.io');
const io = new Server(server);

app.get('/', (_request, response) => {
    response.send('The server is indeed working.')
});

io.on(SocketEvents.Connection, (socket) => {
  console.log('A user has connected.');

  socket.on(SocketEvents.Disconnect, () => {
        console.log('A user has disconnected.')
    });
});

app.listen(port, () => {
    console.log('Fourth Wall listening on port ${port}')
}); 
