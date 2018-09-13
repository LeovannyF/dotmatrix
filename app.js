const { db, seed, Entry } = require('./db/index');
const path = require('path')
const { app, io } = require('./server');
const Filter = require('bad-words');   // this is my bad word filter
const badFilter = new Filter();

io.on('connect', socket => {
  console.log(socket.id, 'is connected')

  //the server listens for a new entry submission and then broadcasts that new entry obj (before actually entering it in the db) to other connected browsers
  socket.on('entry', entry => {
    socket.broadcast.emit('entry', entry);
  })
})

app.get('/api/entry', (req, res, next) => {
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
  Entry.create(req.body)
    .then(entry => {
      res.json(entry);
    })
    .catch(next);
})

const init = async () => {
  await db.sync({ force: true })
  await seed();
}

init();




