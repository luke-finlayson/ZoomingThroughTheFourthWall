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

    /**
     * Inserts a room with the given room name into the room table
     * @param {string} roomID 
     * @param {function} callback The function to invoke following completion or error
     */
    insertRoom(roomID, callback) {
        this.pool.query(`INSERT INTO room VALUES(${this.client.escapeLiteral(roomID)})`, (err) => {
            if (err)
                console.log('There was a rather problematic room insertion error.');
            else
                console.log(`Successful insertion of room with ID ${roomID}`);

            callback(err);
        });
    }

    /**
     * Insert the given user into the users table
     * @param {User} user The user to insert
     * @param {function} callback The function to invoke following completion or error
     */
    insertUser(user, callback) {
        this.pool.query(`INSERT INTO users(id, name) VALUES('${user.id}', ${this.client.escapeLiteral(user.name)})`, (err) => {
            if (err)
                console.log('There was a rather problematic user insertion error.');

            callback(err);
        });
    }

    /**
     * Inserts the given user into the given room
     * @param {*} userID The ID of the user
     * @param {string} roomID The name of the room
     * @param {function} callback The function to invoke following completion or error
     */
    insertUserIntoRoom(userID, roomID, callback) {
        this.pool.query(`INSERT INTO roomUsers VALUES('${userID}', ${this.client.escapeLiteral(roomID)})`, (err) => {
            console.log(err);

            if (callback)
                callback(err);
        });
    }

    /**
     * Inserts the given Message from a user to a specific room
     * @param {Message} message 
     */
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

    /**
     * Gets all the previous messages sent in a particular room
     * @param {string} roomID The name of the room
     * @param {function} callback The function to invoke following completion or error
     */
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

    /**
     * Deletes all the messages in a given room
     * @param {string} roomID The name of the room
     * @param {function} callback The function to invoke following completion or error
     */
    deleteMessages(roomID, callback) {
      this.pool.query(`DELETE FROM messages WHERE room_name = ${this.client.escapeLiteral(roomID)}`, (err) => {
        if (err)
          console.log(err);
      })
    }

    /**
     * Gets all the users currently in a given room
     * @param {string} roomID The name of the room
     * @param {function} callback The function to invoke following completion or error
     */
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

    /**
     * Deletes the given room from the database
     * @param {string} roomID The name of the room to delete
     */
    deleteRoom(roomID) {
        try {
            this.deleteMessages(roomID)
            this.pool.query(`DELETE FROM roomUsers WHERE room_name = '${roomID}'`).then(() => {
                this.pool.query(`DELETE FROM room WHERE name = '${roomID}'`)
            })
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Deletes the given user from the database
     * @param {User} user The User to delete
     */
    deleteUser(user) {
        this.pool.query(`DELETE FROM roomUsers WHERE user_id = '${user.id}'`)
        this.pool.query(`DELETE FROM users WHERE id = '${user.id}'`)
    }
}

module.exports = {
    DataService: DataService,
    User: User,
    Message: Message
};
