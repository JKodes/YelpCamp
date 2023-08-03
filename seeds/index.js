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
    for (let i = 0; i < 450; i++) {
        const randomcity = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const newCamp = new Campground({
            author: '6480a9cf88e63d0e90921f5e',
            location: `${cities[randomcity].city}, ${cities[randomcity].state}`,
            title: `${nameOfCamp(descriptors)} ${nameOfCamp(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed dui rutrum, sollicitudin dolor vitae, lobortis felis. Aenean ac imperdiet risus. Mauris rutrum auctor.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[randomcity].longitude, 
                    cities[randomcity].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/djtxbpcr3/image/upload/v1687925046/YelpCamp/okqzqhanz4p15qc0nhpx.png',
                  filename: 'YelpCamp/okqzqhanz4p15qc0nhpx'
                },
                {
                  url: 'https://res.cloudinary.com/djtxbpcr3/image/upload/v1687925046/YelpCamp/vxyjbjlpxqx7yp5zjz4w.png',
                  filename: 'YelpCamp/vxyjbjlpxqx7yp5zjz4w'        
                }
              ]
        })
        await newCamp.save()
    }
    

}


seedDB().then(() => {
    mongoose.connection.close()
})