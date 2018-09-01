Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/dotMatrix', { logging: false });
const { seedEntries } = require('./seed');

const Entry = db.define('entry', {
  author: Sequelize.STRING,
  city: Sequelize.STRING,
  content: {
    type: Sequelize.STRING,
    get() {
      const content = this.getDataValue('content');
      return `"${content.toUpperCase()}"`;
    }
  }
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
