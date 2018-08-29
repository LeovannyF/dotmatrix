Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/dotMatrix');
const {testCity, testAuthor, testMessages} = require('./seed');

const Message = db.define('message', {
  note: Sequelize.STRING
});

const Author = db.define('author', {
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  content: Sequelize.STRING
});

const seed = async () =>{
  const [message1, message2, message3] = await Promise.all(testMessages.map(message => {
    return Message.create({note: message});
  }))
  const [Leo, Eve, Claudia] = await Promise.all(testAuthor.map(author => {
    return Author.create({name: author});
  }))
}

Message.belongsTo(Author, {as:'Owner'});

module.exports = {
  db,
  Author,
  Message,
  seed
}
