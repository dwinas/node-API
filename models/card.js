
const mongoose = require('mongoose')


const Card = mongoose.model('Card', {

    question: {
        type: String,
        minlength: 1,
        required: true

    },

    answer:{
        type: String,
        minlength: 1,
        required: true

    },

    completed: {
        type: Boolean,
        default: false
    },

    lastActionAt: {
        type: Number,
        defaul: new Date().getTime()
    },

    section:{
        type: Number,
        default: 1
    }
})

module.exports = {Card}