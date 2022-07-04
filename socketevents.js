// A pseudo-static class used for providing solid event names (prevent misspelling)
class SocketEvents {
    static Connection = "connection";
    static Disconnect = "disconnect";
    static NewMessage = "new-message";
    static CheckRoomId = "check-room-id";
    static JoinRoom = "join-room";
    static LeaveRoom = "leave-room";
    static UserJoinedRoom = "user-joined-room";
    static UserLeftRoom = "user-left-room";
    static FindImageText = "find-image-text";
    static PeerReady = "peer-ready";
    static GetRoomParticipants = "get-room-participants";
    static GetMessageHistory = "get-message-history";
    static ClearMessages = "clear-messages";
}

module.exports = SocketEvents;
