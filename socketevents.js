// A pseudo-static class used for providing solid event names (prevent misspelling)
class SocketEvents {
    static Connection = "connection";
    static Disconnect = "disconnect";
    static NewMessage = "new message";
}

module.exports = SocketEvents;