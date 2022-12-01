const { builtinModules } = require("module");
const mongoose = require("./connection");

// extracting Schema and Model from mongoose
const {Schema, model} = mongoose

// make User Login Schema for logging in and logging out of Database
const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
  });
  
  // make a User Database Schema Model 
  const User = model("User", userSchema)

  module.exports = User