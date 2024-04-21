const { Sequelize } = require('sequelize');
const { db } = require('./config');

const sequelize = new Sequelize(db.database, db.user, db.password, {
    dialect: 'postgres',
    host: db.host,
    port: db.port,
    dialectOptions: {
        ssl: {
          require: true,
         }
      }
})

module.exports = sequelize;