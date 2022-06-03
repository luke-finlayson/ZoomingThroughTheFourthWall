# Fourth wall
A video conferencing application built on React Redux and Node.js. Uses WebRTC via peerjs for video streaming between devices.

## Building and running on a local machine (production)

### Requirements
[Install Docker](https://docs.docker.com/get-docker/)

1. Clone the repository into a local folder with `git clone https://github.com/qwertyhpp/ZoomingThroughTheFourthWall`.
2. With your terminal navigated to the cloned folder, run `docker compose build`.
3. Run `docker compose up`.
4. You should now be able to access the web app via https://localhost

## API docs

### Events (Client-side)

* #### "new-message"
  **Type**: Send/Receive

* #### "create-room"
  **Type**: Send

* #### "join-room"
  **Type**: Send

* #### "leave-room"
  **Type**: Send

* #### "user-joined-room"
  **Type**: Receive

* #### "user-left-room"
  **Type**: Receive

In case it is not obvious, _Send_ events can be sent from the client-side, while _Receive_ events can be listened for.

These events are dependent on the usage of socket.io.

### Examples
#### Receiving
```
socket.on("new-message", (data) => {
  // Do something
});
```

#### Sending
```
socket.emit("join-room", roomID);
```
