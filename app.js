const express = require('express');
const app = express();
const {db, seed, Author, Message} = require('./db/index');
const port = process.env.PORT || 3000

app.get('/', async (req, res, next) => {
  const recent = await Message.findOne({
    where: {id:1}
       // order: [ [ 'createdAt', 'DESC' ]] this may always make the item with the id 1 as the most recent creation
  })
  res.send(recent.note)
});

app.get('/input', (req, res, next) =>{
  res.send('this is users users will input')
});

app.post('/', (req, res, next) => { //post that will eventually grab the data that I am trying to post

});

// router.post('/users/:name/tasks', function(req, res){
//   let name = req.params.name;
//   let task = req.body;
//
//   if(task.content === ''){
//     res.status(400).send();
//     return;
//   }
//
//   todo.add(name,task);
//   res.status(201).send(task);
// });

app.listen(port, ()=>{
  console.log(`I am listening on port, ${port}`);
});

const init = async() => {
  await db.sync({force:true})
  await seed();
}

init();

module.exports = app;
