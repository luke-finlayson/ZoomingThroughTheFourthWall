const {Pool,Client} = require('pg')
var name = "";
const pool = new pool({
	user:"postgres",
	host:"localhost",
	database:"zoom",
	password:"",
	port: 5432
})


pool.query("INSERT INTO user(name)VALUES(name)",(err,res)=>{
	console.log(err,res)
	pool.end()
})