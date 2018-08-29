Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/dotMatrix');
const {testCity, testAuthor} = require('./seed');

const Entry = db.define('entry', {
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  content: Sequelize.STRING
});

const seed = async () =>{
  const [Leo, Eve, Claudia] = await Promise.all(testAuthor.map(entry => {
    return Entry.create({name: entry});
  }))
}

module.exports = {
  db,
  Entry,
  seed
}
