// A pseudo-static class used for providing solid event names (prevent misspelling)
class SocketEvents {
    static Connection = "connection";
    static Disconnect = "disconnect";
    static NewMessage = "new-message";
    static CheckRoomId = "check-room-id";
    static JoinRoom = "join-room";
    static LeaveRoom = "leave-room";
    static CreateRoom = "create-room";
    static DeleteRoom = "delete-room";
    static UserJoinedRoom = "user-joined-room";
    static UserLeftRoom = "user-left-room";
    static FindImageText = "find-image-text";
    static PeerReady = "peer-ready";
    static GetRoomParticipants = "get-room-participants";
    static GetMessageHistory = "get-message-history";
    static ClearMessages = "clear-messages";
    static NewStream = "new-stream";
    static RemoveStream = "remove-stream"
}

export default SocketEvents;
