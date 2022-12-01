// Database Connection
require("dotenv").config()  
const mongoose = require('mongoose')
// Setup inputs for our connect function
const Database_URL = process.env.DATABASE_URL;

// Establish Database Connection to Mongo
mongoose.connect(Database_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

/// Events that occurs within the database connection
mongoose.connection.on("open", ()=> {console.log("Connection has been established")})
.on("close", ()=>{console.log("Connection has been disconnected/destroyed")})
.on("error", (error)=>{console.log(`There has been an error that has occurred which is ${error}`)})

// export mongoose with connection to use in other files
module.exports = mongoose