Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/dotMatrix', { logging: false });
const { seedEntries } = require('./seed');

const Entry = db.define('entry', {
  name: Sequelize.STRING,
  city: Sequelize.STRING,
  content: Sequelize.STRING
});

const seed = async () =>{
  const [Leo, Eve, Claudia] = await Promise.all(seedEntries.map(entry => {
    return Entry.create(entry);
  }))
}

module.exports = {
  db,
  Entry,
  seed
}
