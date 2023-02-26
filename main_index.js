const express = require('express')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/yelp-camp')
const Campground = require('./models/campground')

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const app = express()
const path =  require('path')


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/makeCampground', async (req, res) =>{
    const camp = new Campground({title: 'My Backyard', description: 'camping on a budget'})
    await camp.save()
    res.send(camp)
})

app.listen(3000, () =>{
    console.log('You are port 3000')

})

