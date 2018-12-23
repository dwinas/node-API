const expect = require('expect')

const test = require('supertest')

const {app} = require('./../server')
const {Card} = require('./../models/card')


beforeEach((done) => {

    Card.deleteMany({}).then (() =>done())
})


describe('POST/cards', () => {

    it ('shold create new card', (done) => {


        const question = 'Question'
        const answer = 'answer'

        test(app)
        .post('/card')
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
            Card.find().then((cards) => {

                expect(cards.length).toBe(1)
                expect(cards[0].question).toBe(question)
                expect(cards[0].answer).toBe(answer)
                done()
            }).catch((e) => done(e))

        })
    })

    it('Should not create card with invalid request', (done) =>{

        test(app)
        .post('/card')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err)
            }

            Card.find().then((cards) => {
                expect(cards.length).toBe(0)
                done()
            }).catch((e) => done(e))
        })
    })
})