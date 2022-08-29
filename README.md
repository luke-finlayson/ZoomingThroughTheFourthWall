# Fourth wall
A video conferencing application built on React Redux and Node.js. Uses WebRTC via peerjs for video streaming between devices.

## Building and running on a local machine (production)

### Prerequisites
 - Git
 - [Docker](https://docs.docker.com/get-docker/)
 
#### Vision API key for text recognition
 
As this application makes use of the Google [Vision API](https://cloud.google.com/vision), a suitable credentials file is necessary to utilise the text recognition functionality. This assumes that you have a Google Cloud account and you have access to a Compute Engine (or other) service account that has the Vision API enabled. You will need to download the service account credentials file from **IAM & Admin** > **Service Accounts** > [Select a service account with Vision enabled] > **Keys** > **Add key** > **Create new key [or use existing one]** > **JSON key type and create**.

Place the JSON file in the root directory for this repository and name it (exactly) "gc-credentials.json". Upon `docker compose build`, the path of the credentials file will be set to the `GOOGLE_APPLICATION_CREDENTIALS` environment variable that is used by the Vision SDK.

#### SSL key and certificate for HTTPS usage

To use the HTTPS version of the server, an SSL key and certificate will need to be generated and stored in the `keys` directory. If you intend to run this application on a VM, and you have a domain mapped to the IP address of that VM, use something like [Certbot](https://certbot.eff.org) on the VM to get a CA-verified key/cert pair.

##### Example when applying HTTPS to Node.js web server directly:
1. While in the terminal for your VM, [install certbot](https://certbot.eff.org/instructions) if it is not already.
2. Run `sudo certbot certonly --standalone`
3. Follow instructions.
4. Move or copy the generated certificate and private key to the repository's `keys` directory.
5. Name the certificate `fullchain.pem` if it is not that already.
6. Similarly, ensure that the private key is named `privkey.pem`.

---

### Build and Run[^1]
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
