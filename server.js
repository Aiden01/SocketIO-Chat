const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

app.set('view engine', 'ejs')
app.use('/static', express.static('public'))


io.sockets.on('connection', (socket) => {
    socket.on('new message', (message) => {
        console.log(message)
        io.sockets.emit('message received', message)
    })
    console.log('Connection !')
})

app.get('/', function(req, res) {

    res.render('index.ejs')

})

server.listen(process.env.PORT || 8080)