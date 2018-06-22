const mongoose = require('mongoose')

let messageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    }
})

let Message = module.exports = mongoose.model('Message', messageSchema)