CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE room(
    name VARCHAR(200) PRIMARY KEY
);

CREATE TABLE roomUsers(
    user_id UUID,
    room_name VARCHAR(200),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (room_name) REFERENCES room(name),
    PRIMARY KEY (user_id, room_name)
);

CREATE TABLE messages(
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    user_name VARCHAR(200) NOT NULL,
    room_name VARCHAR(200) NOT NULL,
    message VARCHAR(200) NOT NULL,
    timeSent TIMESTAMP NOT NULL,
    FOREIGN KEY(room_name) REFERENCES room(name)
);
