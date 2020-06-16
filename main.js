// import de express
const express = require('express');
const app = express();
const {routes} = require('./configure');
app.use('/zoo', routes.zooRoutes);
// demarrage du serveur
app.listen(3000, ()=>{
    console.log('DBlearningApp Http is listenning in port 3000');
  });

