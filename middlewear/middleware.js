/// Create Libraries and other dependencies ////
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
const animal_router = require("/Users/Mzmz12/Documents/Unit_10_MaxB/Day_1/Animals/controllers/animals_routes")
const session = require("express-session")

/// middle wear registration
const middleware = (app) => {
    app.use(morgan("tiny"))
    app.use(method_Override("_method"))
    app.use(express.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.use("/animal", animal_router)
}

// exporting middle ware dependencies and relationships
module.exports = middleware