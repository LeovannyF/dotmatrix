const { db, seed, Entry } = require('./db/index');
const path = require('path')
const app = require('./server');
const Filter = require('bad-words');   // this is my bad word filter
const badFilter = new Filter();

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
    .then(res.sendStatus(200))
    .catch(next);
})

const init = async () => {
  await db.sync({ force: true })
  await seed();
}

init();




