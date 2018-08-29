const express = require('express');
const app = express();
const {db, seed, Author} = require('./db/index');
const port = process.env.PORT || 3000
const path = require('path')
const bodyParser = require('body-parser');


app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/api/form', (req, res, next) => {  // where users will input data
  res.send('FORMS FOR DAYS')
});

app.get('/', (req, res, next) => { //post that will eventually grab the data that I am trying to post
 res.sendFile(path.join(__dirname, 'public/index.html'))
});

app.post('/api/form', (req, res, next) => {

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
