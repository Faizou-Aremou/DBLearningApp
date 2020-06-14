// import de express
const express = require('express');
const app = express();
// importer les routes
const zooRoutes = require('./routes/zoo');
// Que fais app use  : recupère toutes les routes enregistrées dans l'appliacation express
app.use('/zoo', zooRoutes);
// demarrage du serveur
app.listen(3000, ()=>{
    console.log('DBlearningApp Http is listenning in port 3000');
  });

