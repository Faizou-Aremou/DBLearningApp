
var mysql = require('mysql');


// connection au serveur de base de données mysql
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: 'AremouMP',
  database: 'zoo'
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});



// route enfant message
exports.welcomeMessage = (req, res) => {
  res.json({ message: 'Hello world' });
}

/**
 * Nom des animaux 
 * projection simple
 * select nomA from LesAnimaux
 */

exports.animalsNames = (req, res) => {
  connection.query('select nomA from `LesAnimaux`', (error, result, field) => {
    res.json({
      nomA: result
    })
  })
}

/**
 * Maladies contractées au moins une fois par les animaux du zoo
 * select distinct nomM from LesMaladies 
 */

exports.animalsDiseaseOnce = (req, res) => {
  connection.query('select distinct nomM from `LesMaladies`', (error, result, fields) => {
    res.json({
      nomM: result
    })
  })
}
/**
 * Noms des employés qui habitent la ville de papeete
 * select nomE from Emmployes where adresse=papeete
 */
exports.employee = (req, res) => {
  connection.query('select nomE from `LesEmployes` where `adresse`=?', ['papeete'], (error, result, fields) => {
    res.json({
      nomE: result
    })
  })
}

/**
 * Noms et numéros de cage, des animaux males qui sont originaires du gabon et dont la date de naissance est antérieure à 1980
 * select nomA, noCage from LesAnimaux where sexe='male' and pays='gabon' and anNais<1980
 */
exports.gabonAnimalsNames = (req, res) => {
  connection.query('select nomA, noCage from `LesAnimaux` where `sexe`=? and pays=? and anNais<?', ['male', 'gabon', 1980], (error, result, fields) => {
    res.json({
      nomA: result
    })
  })
}

