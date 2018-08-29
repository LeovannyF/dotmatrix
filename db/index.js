Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/dotMatrix');
const {testCity, testAuthor} = require('./seed');

const Author = db.define('author', {
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  content: Sequelize.STRING
});

const seed = async () =>{
  const [Leo, Eve, Claudia] = await Promise.all(testAuthor.map(author => {
    return Author.create({name: author});
  }))
}

module.exports = {
  db,
  Author,
  seed
}
