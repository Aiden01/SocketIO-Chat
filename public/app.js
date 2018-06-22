const socket = io()
// selecting the message box
const messageBox = document.querySelector('#sendBox')

// listen to keyup event
messageBox.addEventListener('keyup', (e) => {
    // check if the key pressed is enter
    if(e.keyCode !== 13) return
    // get the value of the message
    let message = e.target.value
    // emit the event
    e.target.value = ""
    socket.emit('new message', {message: message})
    e.preventDefault()
})

// receives a new message
socket.on('message received', (message) => {
    console.log(message)
    // create the message
    let msg = document.createElement('li')
    msg.innerHTML = message
    // append to the ul
    let messages = document.querySelector('#messages')
    messages.appendChild(msg)
})