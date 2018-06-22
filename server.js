const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/chat')
let db = mongoose.connection

app.set('view engine', 'ejs')
app.use('/static', express.static('public'))

const Message = require('./models/Message')


io.sockets.on('connection', (socket) => {
    socket.on('new message', (message) => {
        Message.create({content: message.message})
            .then(response => {
                io.sockets.emit('message received', response.content)
            })
    })
    console.log('Connection !')
})

app.get('/', function(req, res) {

    Message.find({}, (err, response) => {
        console.log(response)
        if(err) return console.log(err)
        res.render('index.ejs', {
            messages: response
        })
    })

})

server.listen(process.env.PORT || 8080)