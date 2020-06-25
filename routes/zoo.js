const express = require('express');
// mores informations about router
const router = express.Router();

const zooController = require('../controllers/zooController');

router.get('/message', zooController.welcomeMessage);
router.get('/noms-animaux', zooController.animalsNames);
router.get('/maladies-cont-u', zooController.animalsDiseaseOnce);
router.get('/noms-employes', zooController.employee);
/**
 * Noms et numéros de cage, des animaux males qui sont originaires du gabon et dont la date de naissance est antérieure à 1980
 * select nomA, noCage from LesAnimaux where sexe='male' and pays='gabon' and anNais<1980
 */
router.get('/noms-et-noCage', zooController.gabonAnimalsNames);
router.get('/animaux-non-mal', zooController.animauxNoMalades);
router.get('/animaux-type-nom-mal', zooController.animauxTypesNoMalades);
router.get('/animaux-kenya', zooController.animauxKenyaGrippe);
router.get('/cages-inocuppee', zooController.cagesInocuppee);
router.get('/gardiens-cages-vides', zooController.gardiensCagesVides);
router.get('/employes', zooController.gardiensCagesVides);
router.get('/employes-charly', zooController.employesCharly);
router.get('/doyen-zoo', zooController.doyenzoo);
router.get('/cage-arthur', zooController.doyenzoo);

module.exports = router;