
require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')



const {mongoose} = require('./db/mongoose')
const {User} = require('./models/user')
const {Card} = require('./models/card')

const port = process.env.PORT

const app = express()

app.use(bodyParser.json())

// Korteliu kurimas

app.post('/card',(req, res) =>{

    const newCard = new Card({
        question: req.body.question,
        answer: req.body.answer
    })

    newCard.save().then((doc) => {

        res.send(doc)
    }, (err) => {
        res.status(400).send(err)
    })

})


app.listen(port)


module.exports = {app}



