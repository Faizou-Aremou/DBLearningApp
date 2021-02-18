
const MySqlRoot = require('./mysql-root-model');
// connection au serveur de base de données mysql user : root mp: AremouMP
const mySqlRoot = new MySqlRoot({
  host: "localhost",
  user: "root",
  password: process.argv[2],
  database: 'zoo'
});

module.exports = mySqlRoot;

