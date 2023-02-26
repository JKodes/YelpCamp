const mongoose = require('mongoose')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp')
const Campground = require('../models/campground')

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const nameOfCamp = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const randomcity = Math.floor(Math.random() * 1000)
        const newCamp = new Campground({
            location: `${cities[randomcity].city}, ${cities[randomcity].state}`,
            title: `${nameOfCamp(descriptors)} ${nameOfCamp(places)}`
        })
        await newCamp.save()
    }
    

}


seedDB().then(() => {
    mongoose.connection.close()
})