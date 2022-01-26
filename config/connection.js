// Imports sequelize data
const Sequelize = require('sequelize');
// gets the data to use .env files
require('dotenv').config();

//initializes the sequelize variable
let sequelize;

// starts the server
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // gets the data from .env file to protect data
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}

// exports the server data
module.exports = sequelize;