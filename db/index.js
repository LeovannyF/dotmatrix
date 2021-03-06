Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/dotMatrix', { logging: false });
const { seedEntries } = require('./seed');
const Filter = require('bad-words');   // this is my bad word filter
const badFilter = new Filter();

const Entry = db.define('entry', {
  author: Sequelize.STRING,
  city: Sequelize.STRING,
  content: {
    type: Sequelize.STRING,
    set(content) {
      //filter user input for profanity
      const filtered = badFilter.clean(content);
      const hasProfanity = content !== filtered;

      //if profanity detected, set hasProfanity to true
      if (hasProfanity) this.setDataValue('hasProfanity', true);

      //set content to filtered version
      this.setDataValue('content', filtered.toUpperCase());
    }
  },
  hof: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  hasProfanity: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

//this is my hook for filtering the words, its work but only after it has already been served by websocket
Entry.beforeCreate((user, options) => {
  let filtered = badFilter.clean(user.content);
  user.content = filtered.toUpperCase();
})


const seed = async () => {
  const [Leo, Eve, Claudia] = await Promise.all(seedEntries.map(entry => {
    return Entry.create(entry);
  }))
}

module.exports = {
  db,
  Entry,
  seed
}
