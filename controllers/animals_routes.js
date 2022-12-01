/// creating dependencies and libraries
const express = require("express");
const method_Override = require("method-override")
const morgan = require("morgan")
const bcrypt = require("bcryptjs");
/// connecting to the Database Model Schema extracted from the Mongoose Database
const Animal = require("../models/animals");
const User = require("../models/users");
const { request } = require("http");
const { response } = require("express");


// creating the router to create routes into the local server
const router = express.Router()

// create Router middleware
router.use(morgan("tiny"))
router.use(method_Override("_method"))
router.use(express.urlencoded({extended: true}));
router.use(express.static("public"));

router.use((req, res, next) => {
    if (req.session.loggedIn) {
      next();
    } else {
      res.redirect("/login");
    }
  });

///////////////////////////////
/// Animal User Display Routes
///////////////////////////////



// create Seed Route and Seed File
router.get("/seed_db_file", (request, response)=>{
    const animals_Data = [{ species: "human", extinct: false, location: "worldwide", lifeExpectancy: 75 },
                    { species: "sabre tooth tiger", extinct: true, location: "Russia", lifeExpectancy: 25 },
                    { species: "giant squid", extinct: false, location: "atlantic & pacific ocean", lifeExpectancy: 15 },
                    { species: "lion", extinct: false, location: "Africa (all regions)", lifeExpectancy: 36 },
                    { species: "t-rex", extinct: true, location: "South America", lifeExpectancy: 40 },
                ]
    
    // deleting of data within the mongoose model database with the imported schema/model and reseeding data into Seed file
    Animal.deleteMany({}, (error, ani_data)=>{
        /// reseeding the deleted data within the animal mongoose database model with new data
        Animal.create(animals_Data, (error, ani_data)=> {
        // reseeds data into mongoose database model within a json format
            response.json(ani_data)
        })
    })
})

// home/index route
router.get("/", (request, response) => {
    Animal.find({username: request.session.username}, (error, animal)=>{
        response.render("index.ejs", {animal})
    })
})

// registering users routes
router.get("/register", (request, response)=>{
    response.render("user_register.ejs")
})

// register new users to account
router.post('/register', async (request, response)=>{
    // encrypted password
    request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(10))
    // create new users
    User.create(request.body, (error, usr)=>{
        // redirect to the login page
        response.redirect("/login")
    })
})

// The login Routes
router.get("/login", (request, response) => {
    res.render("user_login.ejs", {User});
  });
// logging in within the login page
router.post("/login", (request, response) => {
    const{username, password} = request.body
    // checking if username exists
    User.findOne({username}, async (error, usr) =>{
        if(error){
            response.send("Username does not exist")
        }
        // cross comparing passwords 
        const psswrd_compare = await bcrypt.compare(password, usr.password)
        if(!psswrd_compare){
            response.send("wrong password")
        }
        // saving login info within sessions
        request.session.loggedIn = true
        request.session.username = username

        // redirect to homepage
        response.redirect("/animals")
    })
})

router.post("/logout", (request, response) => {
    request.session.destroy((error) => {
        response.redirect("/")
    })
})

// home route
router.get("/animal", async(request, response) => {
    const animal = await Animal.find({})
    response.render("index.ejs", {animal})
})

// deleting route
router.delete("/animal/:id", (request, response)=> {
    const id = request.params.id
    // delete animal
    Animal.findByIdAndRemove(id, (error, animal) => {
        response.redirect("/animal")
    })
})

// update route
router.put("/animal/:id", (request, response) => {
    const id = request.params.id
    // checking if extinct property is true or not
    request.body.extinct = request.body.extinct === "on" ? true : false;
    // update the animal
    Animal.findByIdAndUpdate(id, request.body, { new: true }, (err, animal) => {
    // redirect user back to main page
    console.log("update animal:", animal);
    response.redirect("/animal");
})})

// create route
router.post("/animal", (request, response) => {
    // check if the Extinct property is true or false
    request.body.extinct = request.body.extinct === "on" ? true : false;
    // create the new animal
    Animal.create(request.body, (err, animal) => {
      // redirect the user back to the main animals page after animal is created
      res.redirect("/animal");
    });
  });

// edit route
router.get("/animal/:id/edit", (request, response) =>{
    const id = request.params.id
    // get the animal by the id within the Mongo database
    Animal.findById(id, (error, animal) => {
        // render the data from the Animal Mongo database and send it to the edit.ejs template
        response.render("animal_edit.ejs", {animal})
    })
})

// show route
router.get("/animals/:id", (request, response) => {
    // get the id from params
    const id = req.params.id;
    // find the particular animal from the database
    Animal.findById(id, (err, animal) => {
      // render the template with the data from the database
      res.render("animal_show.ejs", { animal });
    });
  })
