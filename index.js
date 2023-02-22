const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('HELLO THIS YELP CAMP')
})

app.listen(3000, () =>{
    console.log('You are port 3000')

})

