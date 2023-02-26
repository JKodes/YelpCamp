const mongoose = require('mongoose')
const cities = require('./cities')
mongoose.connect('mongodb://localhost:27017/yelp-camp')
const Campground = require('../models/campground')

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const randomcity = Math.floor(Math.random() * 1000)
        const newCamp = new Campground({
            location: `${cities[randomcity].city}, ${cities[randomcity].state}`
        })
        await newCamp.save()
    }
    

}


seedDB()