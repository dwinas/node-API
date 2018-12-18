const mongoose = require('mongoose')

const User = mongoose.model('User', {

    email: {
        type: String,
        require: true, 
        trim: true,
        minlength: 4
        
    }
})

module.exports = {User}