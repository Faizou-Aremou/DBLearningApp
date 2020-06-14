
const MySqlRoot = require('./mysql-root-model');
// connection au serveur de base de données mysql
const mySqlRoot = new MySqlRoot({
  host: "localhost",
  user: "root",
  password: 'AremouMP',
  database: 'zoo'
});

/*try {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
    process.on('SIGINT', () => {
      connection.end();
    })

    
  });

} catch (error) {
  console.log('error is happen')
}*/


module.exports = mySqlRoot;

