const express = require('express');
const router = express.Router();

const zooController = require('../controllers/zooController')

router.get('/message', zooController.welcomeMessage);
router.get('/nom-animaux', zooController.animalsNames);
router.get('/maladie-cont-u', zooController.animalsDiseaseOnce);
router.get('/nom-employes', zooController.employee);

/**
 * Noms et numéros de cage, des animaux males qui sont originaires du gabon et dont la date de naissance est antérieure à 1980
 * select nomA, noCage from LesAnimaux where sexe='male' and pays='gabon' and anNais<1980
 */
router.get('/noms-et-noCage', zooController.gabonAnimalsNames);

module.exports = router;