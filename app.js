const express = require('express');
const app = express();
const {db, seed, Entry} = require('./db/index');
const port = process.env.PORT || 3000
const path = require('path')
const bodyParser = require('body-parser');


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/entry', (req, res, next) => {
  Entry.findAll({
    limit: 1,
    order:[
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
  Entry.create({name: req.body.name,
                city: req.body.city,
                content: req.body.content})
  .then(res.sendStatus(200))
  .catch(next);
})

app.listen(port, ()=>{
  console.log(`I am listening on port, ${port}`);
});

const init = async() => {
  await db.sync({force:true})
  await seed();
}

init();

module.exports = app;
