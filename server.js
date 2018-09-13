const socketio = require('socket.io');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000

app.use(express.static('public'));
app.use(express.json());

const server = app.listen(port, () => {
  console.log(`I am listening on port, ${port}`);
});

//========== Web Socket Logic ==================================== aw yea ===============\\

const io = socketio(server);

io.on('connect', socket => {
  console.log(socket.id, 'is connected')

  //the server listens for a new entry submission and then broadcasts that new entry obj (before actually entering it in the db) to other connected browsers
  socket.on('entry', entry => {
    socket.broadcast.emit('entry', entry);
  })
})

module.exports = app;