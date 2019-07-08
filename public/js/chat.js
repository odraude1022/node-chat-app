const socket = io()

const messageForm = document.querySelector('#message-form')
const messageFormInput = messageForm.querySelector('input')
const messageFormButton = messageForm.querySelector('button')
const sendLocationButton = document.querySelector('#send-location')

socket.on('message', (message) => {
  console.log(message)
})

messageForm.addEventListener('submit', (event) => {
  event.preventDefault()

  messageFormButton.setAttribute('disabled', 'disabled')

  const message = event.target.elements.message.value //grabs the element on the form with the "name" attribute equal to "message"
  socket.emit('sendMessage', message, (error) => {
    messageFormButton.removeAttribute('disabled')
    messageFormInput.value = ''
    messageFormInput.focus()
    if(error) {
      return console.log(error)
    }
    console.log('Message delivered!')
  })
})

sendLocationButton.addEventListener('click', (event) => {
  if(!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser')
  }

  sendLocationButton.setAttribute('disabled', 'disabled')

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }, () => {
      sendLocationButton.removeAttribute('disabled')
      console.log('Location shared!')
    })
  })



})
