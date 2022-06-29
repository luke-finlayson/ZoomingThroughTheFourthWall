# Fourth wall
A video conferencing application built on React Redux and Node.js. Uses WebRTC via peerjs for video streaming between devices.

## Building and running on a local machine (production)

### Requirements
[Install Docker](https://docs.docker.com/get-docker/)

1. Clone the repository into a local folder with `git clone https://github.com/qwertyhpp/ZoomingThroughTheFourthWall`.
2. With your terminal navigated to the cloned folder, run `docker compose build`.
3. Run `docker compose up`.
4. You should now be able to access the web app via https://localhost

## Socket.io Event Reference (for Client-side)

Socket event names can be accessed by importing the static class SocketEvents.
In case it is not obvious, _Send_ events can be sent from the client-side, while _Receive_ events can be listened for.

| Event Name | Type | Takes | Gives |
| --- | --- | --- | --- |
| `NewMessage` | Send/Receive | Message content | Message Object |
| `CheckRoomId` | Send | Room ID | --- |
| `JoinRoom` | Send | Room ID, Username, User ID | --- |
| `LeaveRoom` | Send | --- | --- |
| `UserJoinedRoom` | Receive | --- | User ID, Username |
| `UserLeftRoom` | Receive | --- | User ID |
| `FindImageText` | Send | Callback, Base 64 encoded Image | --- |
| `PeerReady` | Send | --- | --- |
| `GetRoomParticipants` | Send | Room ID | --- |
| `GetMessageHistory` | Send | Room ID | --- |

### Examples
#### Receiving
```
socket.on(SocketEvents.NewMessage, (message) => {
  // Do something
});
```

#### Sending
```
socket.emit(SocketEvents.JoinRoom, roomID);
```
