const expect = require('expect')

const test = require('supertest')

const {app} = require('./../server')
const {Card} = require('./../models/card')


const cards = [{
    question:'question1',
    answer: 'answer1'
},{
    question: 'question2',
    answer: 'answer2'
}]


beforeEach((done) => {

    Card.deleteMany({}).then (() =>{

        return Card.insertMany(cards)
    }).then(() => done())
    
 
})


describe('POST/cards', () => {

    it ('shold create new card', (done) => {


        const question = 'Question'
        const answer = 'answer'

        test(app)
        .post('/cards')
        .send({question, answer})
        .expect(200)
        
        .expect((res)=>{
            expect(res.body.question).toBe(question)
            expect(res.body.answer).toBe(answer)
        })
        .end((err, res) => {

            if(err) {

                return done(err)
            }
            Card.find({question, answer}).then((cards) => {

                expect(cards.length).toBe(1)
                expect(cards[0].question).toBe(question)
                expect(cards[0].answer).toBe(answer)
                done()
            }).catch((e) => done(e))

        })
    })

    it('Should not create card with invalid request', (done) =>{

        test(app)
        .post('/cards')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err)
            }

            Card.find().then((cards) => {
                expect(cards.length).toBe(2)
                done()
            }).catch((e) => done(e))
        })
    })
})

describe('GET /cards', ()=> {

    it('Should get all cards', (done)=>{

        test(app)
        .get('/cards')
        .expect(200)
        .end((err, res) => {

            if (err) {
                return done(err)
            }
            expect(res.body.cards.length).toBe(2)
            done()
        })
        
    })
})