
require('./config/config')

const express = require('express')
const bodyParser = require('body-parser')
const{ObjectID} = require('mongodb')
const {mongoose} = require('./db/mongoose')
const {User} = require('./models/user')
const {Card} = require('./models/card')

const port = process.env.PORT

const app = express()

app.use(bodyParser.json())

// Creating cards

app.post('/cards',(req, res) =>{
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

// Getting cards

app.get('/cards', (req, res) =>{

    Card.find().then((cards) => {

        res.send({cards})
    }, (err) => {
        res.status(400).send()
    })
})

app.get('/cards/:id', (req, res) =>{
    const id = req.params.id
    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    } 

    Card.findById(id).then((card) =>{
        if(!card) {
            return res.status(404).send()
        }
        res.send({card})
    }).catch((e) => {
        res.status(400).send(e)
    })
})

//Deleting cards

app.delete('/cards', (req, res) =>{

    Card.deleteMany({}).then((doc)=>{

        res.send(doc)
    }, (err)=> {
        res.status(400).send()
    })
})


app.delete('/cards/:id', (req, res) =>{

    const id = req.params.id

    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    }
    Card.findByIdAndDelete(id).then((card)=>{
        if(!card){
            return res.status(404).send()
        }
        res.send({card})
    }, (err) =>{
        res.status(400).send()
    })
})



app.listen(port, ()=>{

    console.log(`Started up at port ${port}`)
})


module.exports = {app}



