# Fourth wall
A video conferencing application built on React Redux and Node.js. Uses WebRTC via peerjs for video streaming between devices.

## Building and running on a local machine (production)

#### Prerequisites
 - Git
 - [Docker](https://docs.docker.com/get-docker/)

#### Build and Run[^1]
1. Clone the repository into a local folder with `git clone https://github.com/qwertyhpp/ZoomingThroughTheFourthWall`.
2. With your terminal navigated to the cloned folder, run `docker compose build`.
3. Run `docker compose up`.
4. You should now be able to access the web app via https://localhost

[^1]: Note that the site will **not** be able to connect to the postgres database if run on Windows.


## Socket.io Event Reference (for Client-side)

Socket event names can be accessed by importing the static class SocketEvents.
In case it is not obvious, _Send_ events can be sent from the client-side, while _Receive_ events can be listened for.

| Event Name | Type | Takes | Gives | Description |
| --- | --- | --- | --- | --- |
| `NewMessage` | Send/Receive | Message content | Message Object | Creates a new chat message |
| `CheckRoomId` | Send | Room ID | --- | Checks if a given room name exists or is taken |
| `JoinRoom` | Send | Room ID, Username, User ID | --- | Joins the given room |
| `LeaveRoom` | Send | --- | --- | Leaves the current room |
| `UserJoinedRoom` | Receive | --- | User ID, Username | Notifys connected users of a new user |
| `UserLeftRoom` | Receive | --- | User ID | Notifys connected users of a user who left |
| `FindImageText` | Send | Callback, Base 64 encoded Image | --- | Returns the text found in an image |
| `PeerReady` | Send | --- | --- | Notifys server that user is ready to start streaming media |
| `GetRoomParticipants` | Send | Room ID | --- | Returns the connected users in a room |
| `GetMessageHistory` | Send | Room ID | --- | Returns all previous messages in a room |
| `ClearMessages` | Send/Receive | --- | --- | Deletes all previous messages in a room |

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
