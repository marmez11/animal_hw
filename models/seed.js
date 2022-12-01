// Import dependencies
require('dotenv').config()
const mongoose = require("./connection")
const Animal = require("./animals")

// Secure connection to Mongoose Database again
mongoose.connection.on("open", ()=>{
    // defining, determining and declaring data to place into Mongo Database
    const animals_Data = [{ species: "human", extinct: false, location: "worldwide", lifeExpectancy: 75 },
    { species: "sabre tooth tiger", extinct: true, location: "Russia", lifeExpectancy: 25 },
    { species: "giant squid", extinct: false, location: "atlantic & pacific ocean", lifeExpectancy: 15 },
    { species: "lion", extinct: false, location: "Africa (all regions)", lifeExpectancy: 36 },
    { species: "t-rex", extinct: true, location: "South America", lifeExpectancy: 40 },
]
    
// deleting/clearing data from the initial Mongo Database
Animal.remove({}, (error, new_animal_data)=>{
    // create new data model/schema and fill it with the new animal data
    Animal.create(animals_Data, (error, new_animal_data)=>{
        console.log(new_animal_data)
        console.log("Create new Animal Data Schema/Model")

    // Closing the mongo databse connection
    mongoose.connection.close()
    })
})

})