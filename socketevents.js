// A pseudo-static class used for providing solid event names (prevent misspelling)
class SocketEvents {
    static Connection = "connection";
    static Disconnect = "disconnect";
    static NewMessage = "new-message";
    static CreateRoom = "create-room";
    static JoinRoom = "join-room";
    static LeaveRoom = "leave-room";
    static UserJoinedRoom = "user-joined-room";
    static UserLeftRoom = "user-left-room";
    static FindImageText = "find-image-text";
}

module.exports = SocketEvents;