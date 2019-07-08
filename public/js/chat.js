const socket = io()
socket.on('message', (message) => {
  console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const message = event.target.elements.message.value //grabs the element on the form with the "name" attribute equal to "message"
  socket.emit('sendMessage', message)
})
