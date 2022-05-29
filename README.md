# ZoomingThroughTheFourthWall

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
