const {Pool,Client} = require('pg')
var message = "";
var name = "";
const pool = new pool({
	user:"postgres",
	host:"localhost",
	database:"zoom",
	password:"",
	port: 5432
})


pool.query("INSERT INTO messages(name,message)VALUES(name,message)",(err,res)=>{
	console.log(err,res)
	pool.end()
})