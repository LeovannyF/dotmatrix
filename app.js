const express = require('express');
const app = express();
const { db, seed, Entry } = require('./db/index');
const port = process.env.PORT || 3000
const path = require('path')
const bodyParser = require('body-parser');
const socketio = require('socket.io');



app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/entry', (req, res, next) => {
  console.log('hit')
  Entry.findAll({
    limit: 1,
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then(response => res.send(response))
    .catch(next);
})

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.post('/api/user/entry', (req, res, next) => {
  Entry.create({
    name: req.body.name,
    city: req.body.city,
    content: req.body.content
  })
    .then(res.sendStatus(200))
    .catch(next);
})

const server = app.listen(port, () => {
  console.log(`I am listening on port, ${port}`);
});

const init = async () => {
  await db.sync({ force: true })
  await seed();
}

init();

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
