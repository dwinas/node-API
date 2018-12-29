
require('./config/config')
const _ = require('lodash')
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

app.patch('/cards/:id', (req, res)=>{

    const id = req.params.id
    const body = _.pick(req.body, ['question', 'answer', 'completed'])

    if(!ObjectID.isValid(id)){
        return res.status(404).send()
    }
 //card updating if completed status changed to true
    if(_.isBoolean(body.completed) && body.completed){

            Card.findByIdAndUpdate(id, {
                $set:{lastActionAt: new Date().getTime(),
                    completed: true},
                $inc:{section: 1}
            },
            {new: true}).then((card) =>{ 
                if(!card){
                    return res.status(404).send()
                }
                res.send(card)
            }, (err) => { if (err) return res.status(400).send(err)})
 //card updating if completed status changed to false
        } else if (_.isBoolean(body.completed) && !body.completed){
        console.log('card updating if false')

        Card.findByIdAndUpdate(id, {
            $set:{
                lastActionAt: new Date().getTime(),
                section: 1,
                completed: false
            }},{new: true}).then((card) =>{ 
                if(!card){
                    return res.status(404).send()
                }
                res.send(card)
            }, (err) => { if (err) return res.status(400).send(err)})
//updating question and answer
        } else if (body.question && body.answer)
        {
        console.log('updating question and answer')
        body.lastActionAt = new Date().getTime()
        Card.findByIdAndUpdate(id, {$set: body}, {new: true}).then((card) =>{
            if(!card){
                 return res.status(404).send()
            }
             res.send({card})
        }, (err) =>{
            res.status(404).send(err)
        })
    }
    else {res.status(404).send()}

})




app.listen(port, ()=>{

    console.log(`Started up at port ${port}`)
})

