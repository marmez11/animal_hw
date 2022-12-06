/// creating dependencies and libraries
const express = require("express");
const bcrypt = require("bcryptjs");
/// connecting to the Database Model Schema extracted from the Mongoose Database
const Animal = require("../models/animals.js");
// const User = require("../models/users.js");
const { request } = require("http");
const { response } = require("express");

// creating Mongoose Database and establishing connections without errors
const mongoose = require("mongoose");
const DB_URL = "mongodb+srv://mrz11:Qwerasdf11!!@sei.qcrf0tv.mongodb.net/?retryWrites=true&w=majority"
const configuration = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
mongoose.connection.on("open", ()=> {console.log("Connection has been established")})
  .on("close", ()=>{console.log("Connection has been disconnected/destroyed")})
  .on("error", (error)=>{console.log(`There has been an error that has occurred which is ${error}`)})
  
// creating router 
const router = express.Router();

///////////////////////////////
/// Animal User Display Routes
///////////////////////////////

// connect to Mongo Database
mongoose.connect(DB_URL, configuration)

// home route, checking if server is running
router.get("/", (request, response) => {
    response.send("Your server is running...")
})

// create Seed Route and Seed File
router.get("/seeding_db_file", (request, response)=>{
    const animals_Data = [{ species: "human", extinct: false, location: "worldwide", lifeExpectancy: 75 },
                    { species: "sabre tooth tiger", extinct: true, location: "Russia", lifeExpectancy: 25 },
                    { species: "giant squid", extinct: false, location: "atlantic & pacific ocean", lifeExpectancy: 15 },
                    { species: "lion", extinct: false, location: "Africa (all regions)", lifeExpectancy: 36 },
                    { species: "t-rex", extinct: true, location: "South America", lifeExpectancy: 40 },
                    { species: "cat", location: "egypt", extinct: false, lifeExpectancy: 10 },
    { species: "dog", location: "siberia", extinct: false, lifeExpectancy: 11 }]
    
    // deleting of data within the mongoose model database with the imported schema/model and reseeding data into Seed file
    Animal.deleteMany({}, (error, ani_data)=>{
        /// reseeding the deleted data within the animal mongoose database model with new data
        Animal.create(animals_Data, (error, ani_data)=> {
        // reseeds data into mongoose database model within a json format
            response.json(ani_data)
        })
    })
})

// data display route
router.get("/animal_data", async(request, response) => {
    const animal = await Animal.find({})
    response.send({animal})
})

// indexing route
router.get("/animal", async(request, response) => {
    const animals = await Animal.find({})
    response.render("index.ejs", {animals})
})

// new route
router.get("/animal/new", (request, response) => {
    response.render("animal_new.ejs")
  });

// show route (R: Read)
router.get("/animal/:id", async(request, response) => {
    // get the id from params
    const id = request.params.id;
    // animal data
    const animal_show = await Animal.find({})
      // render the template with the data from the database
      response.render("animal_show.ejs", { animal: animal_show[id], id: request.params.id });
  })

// edit route (U: Update)
router.get("/animal/:id/edit", async(request, response) =>{
    // get the id from params
    const id = request.params.id;
    // animal data
    const animal_edit = await Animal.find({})
      // render the template with the data from the database
      response.render("animal_edit.ejs", { animal: animal_edit[id], id:request.params.id });
  })

// create route (C: Create)
router.post("/animal", async(request, response) => {
    // check if the Extinct property is true or false
    request.body.extinct = request.body.extinct === "on" ? true : false;
    // animal data
    const animal_create = await Animal.find({})
    // create the new animal
    Animal.create(request.body, (err, animal) => {
      // redirect the user back to the main animals page after animal is created
      console.log(request.body)
      response.redirect("/animal");
    });
  });

// deleting route (D: Delete)
router.delete("/animal/:id", (request, response)=> {
    const id = request.params.id
    // delete animal
    Animal.findByIdAndRemove(id, (error, animal) => {
        response.redirect("/animal")
    })
})

//update route
router.put("/animals/:id", (req, res) => {
    // get the id from params
    const id = req.params.id;
    // check if the extinct property should be true or false
    req.body.extinct = req.body.extinct === "on" ? true : false;
    // update the animal
    Animal.findByIdAndUpdate(id, req.body, { new: true }, (err, animal) => {
      // redirect user back to main page
      console.log("update animal:", animal);
      res.redirect("/animals");
    });
  });



module.exports = router