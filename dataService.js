const {Pool,Client} = require('pg')

class DataService{
    constructor() {
        this.pool = new Pool({
            user: "postgres",
            host: "localhost",
            database: "zoom",
            password: "",
            port: 5432
        });
    }

    insertUsername() {
        this.pool.query("INSERT INTO user(name)VALUES(name)", (err, res) => {
            console.log(err, res);
        });
    }

    getMessages() {
        this.pool.query("SELECT * FROM user, messages", (err, res) => {
            console.log(err, res);
        });
    }

    insertMessage(author, message) {
        this.pool.query("INSERT INTO messages(name,message)VALUES(name,message)", (err,res) => {
            console.log(err, res);
        })
    }

    getUserNames() {
        this.pool.query("SELECT name FROM user", (err,res) => {
            console.log(err, res);
        })
    }
}

module.exports = DataService;