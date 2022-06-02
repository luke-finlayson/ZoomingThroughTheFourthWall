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
        this.pool.query("INSERT INTO account(name)VALUES(name)", (err, res) => {
            console.log(err, res);
        });
    }

    getMessages() {
        this.pool.query("SELECT * FROM account, messages", (err, res) => {
            console.log(err, res);
        });
    }

    insertMessage(author, message) {
        this.pool.query("INSERT INTO messages(name,message)VALUES(name,message)", (err,res) => {
            console.log(err, res);
        })
    }

    getUserNames() {
        this.pool.query("SELECT name FROM account", (err,res) => {
            console.log(err, res);
        })
    }
}

module.exports = DataService;
