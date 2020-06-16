
const MySqlRoot = require('./mysql-root-model');
// connection au serveur de base de données mysql
const mySqlRoot = new MySqlRoot({
  host: "localhost",
  user: "root",
  password: 'AremouMP',
  database: 'zoo'
});

module.exports = mySqlRoot;

