// import de express
var mysql = require('mysql'); 
var express = require('express');
var app = express();
// importer les routes de zoo
// QUE FAIS REQUIRE dans les détails
var zooRoutes = require('./routes/zoo');
// Que fais app use  : recupère toutes les routes enregistrées dans l'appliacation express
app.use('/zoo', zooRoutes);
// demarrage du serveur
app.listen(3000, ()=>{
    console.log('DBlearningApp Http is listenning in port 3000');
  });

