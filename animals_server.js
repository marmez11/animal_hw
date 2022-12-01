// Animals App

// creating Express library and the middleware dependecies to establish connections
const express = require("express")
const middleware = require("/Users/Mzmz12/Documents/Unit_10_MaxB/Day_1/Animals/middlewear/middleware")

// Creating express application and register middleware dependencies 
const animal_app = express()
middleware(animal_app)

// PORT declaration
const PORT = process.env.PORT || 4005

// connecting and listening to port 4005 in local host server
animal_app.listen(PORT, ()=>{
    console.log(`Now listening into the port ${PORT}`)
})
