"use strict";

const mongoose = require("mongoose");
const app = require("./app");
const port = 3900;

const url = "mongodb://localhost:27017/api_rest_blog";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const useFindAndModify = "useFindAndModify";

mongoose.set(useFindAndModify, false);
mongoose.Promise = global.Promise;
mongoose.connect(url, options).then(() => {
  console.log("Conexión exitosa");

  //Crear server

  app.listen(port, () => {
    console.log("respuesta del server http://localhost:" + port);
  });
});
