
const mySqlRoot = require('../db/mysql-root');

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

  mySqlRoot.query('select nomA from `LesAnimaux`').then((result) => {
    res.json({
      nomAs: result
    });
  }).catch((err) => {
    res.status(503).send(err);
  });

}


/**
 * Maladies contractées au moins une fois par les animaux du zoo
 * select distinct nomM from LesMaladies 
 */

exports.animalsDiseaseOnce = (req, res) => {

  mySqlRoot.query('select distinct nomM from `LesMaladies`').then((result) => {
    res.json({
      nomMs: result
    });
  }).catch((err) => {
    res.status(503).send(err);
  });

}
/**
 * Noms des employés qui habitent la ville de papeete
 * select nomE from Emmployes where adresse=papeete
 */
exports.employee = (req, res) => {

  mySqlRoot.query('select nomE from `LesEmployes` where `adresse`=?', ['papeete']).then((result) => {
    res.json({
      nomMs: result
    });
  }).catch((err) => {
    res.status(503).send(err);
  });

}

/**
 * Noms et numéros de cage, des animaux males qui sont originaires du gabon et dont la date de naissance est antérieure à 1980
 * select nomA, noCage from LesAnimaux where sexe='male' and pays='gabon' and anNais<1980
 */
exports.gabonAnimalsNames = (req, res) => {

  mySqlRoot.query('select nomA, noCage from `LesAnimaux` where `sexe`=? and pays=?', ['male', 'gabon']).then((result) => {
    res.json({
      nomAs_noCages: result
    })
  }).catch((err) => {
    res.status(503).send(err);
  });
}

