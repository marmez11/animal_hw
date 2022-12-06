// Animals App

// creating Express library and the middleware dependecies to establish connections
/*
- express => web framework for create server and writing routes

- mongoose => ODM for connecting to and sending queries to a mongo database

- method-override => allows us to swap the method of a request based on a URL query

- ejs => our templating engine

- dotenv => will allow us to use a `.env` file to define environmental variables we can access via the `process.env` object

- morgan => logs details about requests to our server, mainly to help us debug
*/
require("dotenv").config(); // loading environmental variables
const express = require("express");
const method_Override = require("method-override")
const morgan = require("morgan")
const animal_router = require("./controllers/animals_routes.js")

// Creating express application and register middleware dependencies 
const animal_app = express()

/// middle wear registration

animal_app.use(morgan("tiny"))
animal_app.use(method_Override("_method"))
animal_app.use(express.urlencoded({extended: true}));
animal_app.use(express.static("public"));
animal_app.use("/", animal_router)


// PORT declaration
const PORT = process.env.PORT || 4005

// connecting and listening to port 4005 in local host server
animal_app.listen(PORT, ()=>{
    console.log(`Now listening into the port ${PORT}`)
})
