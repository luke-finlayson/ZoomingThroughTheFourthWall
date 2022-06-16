CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE room(
    id UUID PRIMARY KEY
);

CREATE TABLE roomUsers(
    user_id UUID,
    room_id UUID,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_id) REFERENCES room(id),
    PRIMARY KEY (user_id, room_id)
);

CREATE TABLE messages(
    id UUID PRIMARY KEY,
    user_id UUID,
    room_id UUID,
    message VARCHAR(200) NOT NULL,
    timeSent TIMESTAMP NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(room_id) REFERENCES room(id)
);

