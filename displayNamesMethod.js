const {Pool,Client} = require('pg')
const pool = new pool({
    user:"postgres",
    host:"localhost",
    database:"zoom",
    password:"",
    port: 5432
})


pool.query("SELECT name FROM user",(err,res)=>{
    console.log(err,res)
    pool.end()
})