// create library/packages dependencies and express 
const { builtinModules } = require("module");
const mongoose = require("./connection");

// extracting Schema and Model from mongoose
const {Schema, model} = mongoose

// making Database/Data Schema for Animals
const animal_schema = new Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
})

// making a database model for Animal database data
const Animal = model("Animal", animal_schema)

// Export the Connection/Models
////////////////////////////////////////////////////
module.exports = Animal