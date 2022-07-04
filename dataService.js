const { Pool, Client } = require('pg')

class Message {
    authorID;
    authorName;
    content;
    roomID;
    timeSent;

    constructor(authorID, authorName, roomID, content, timeSent = new Date(Date.now()).toISOString()) {
        this.authorID = authorID;
        this.authorName = authorName;
        this.content = content;
        this.roomID = roomID;
        this.timeSent = timeSent;
    }
}

class User {
    id;
    name;

    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

class DataService{
    constructor() {
        this.pool = new Pool({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: 5432
        });

        this.client = new Client();
    }

    insertRoom(roomID, callback) {
        this.pool.query(`INSERT INTO room VALUES(${this.client.escapeLiteral(roomID)})`, (err) => {
            if (err)
                console.log('There was a rather problematic room insertion error.');
            else
                console.log(`Successful insertion of room with ID ${roomID}`);

            callback(err);
        });
    }

    insertUser(user, callback) {
        this.pool.query(`INSERT INTO users(id, name) VALUES('${user.id}', ${this.client.escapeLiteral(user.name)})`, (err) => {
            if (err)
                console.log('There was a rather problematic user insertion error.');

            callback(err);
        });
    }

    insertUserIntoRoom(userID, roomID, callback) {
        this.pool.query(`INSERT INTO roomUsers VALUES('${userID}', ${this.client.escapeLiteral(roomID)})`, (err) => {
            console.log(err);

            if (callback)
                callback(err);
        });
    }

    insertMessage(message) {
        var authorID = this.client.escapeLiteral(message.authorID);
        var authorName = this.client.escapeLiteral(message.authorName);
        var roomID = this.client.escapeLiteral(message.roomID);
        var content = this.client.escapeLiteral(message.content);

        this.pool.query(`INSERT INTO messages(id, user_id, user_name, room_name, message, timeSent) VALUES(uuid_generate_v4(), ${authorID}, ${authorName}, ${roomID}, ${content}, '${message.timeSent}')`, (err) => {
            if (err)
                console.log(err);
        })
    }

    getMessages(roomID, callback) {
        this.pool.query(`SELECT * FROM messages WHERE room_name = ${this.client.escapeLiteral(roomID)}`, (err, result) => {
            if (err)
                console.log(err);

            // var messages = result.rows.map((_value, _index, row) => {
            //     return new Message(row[1], row[2], row[3], row[4], row[5]);
            // });

            callback(err, result);
        });
    }

    deleteMessages(roomID, callback) {
      this.pool.query(`DELETE FROM messages WHERE room_name = ${this.client.escapeLiteral(roomID)}`, (err) => {
        if (err)
          console.log(err);
      })
    }

    getUsersInRoom(roomID, callback) {
        this.pool.query(`SELECT u.id, u.name FROM users u JOIN roomUsers r ON r.user_id = u.id WHERE r.room_name = ${this.client.escapeLiteral(roomID)}`, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }

            var users = result.rows.map((_value, _index, row) => {
                return new User(row[0], row[1]);
            });

            callback(err, users);
        });
    }
}

module.exports = {
    DataService: DataService,
    User: User,
    Message: Message
};
