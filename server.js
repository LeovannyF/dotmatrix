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


module.exports = {
  app,
  io
}