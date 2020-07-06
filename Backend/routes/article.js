"use strict";

const express = require("express");
const ArticleController = require("../controllers/article");
const { route } = require("../app");

const router = express.Router();

const multipart = require("connect-multiparty");
const md_upload = multipart({ uploadDir: "./upload/articles" });

//rutas de prueba
router.post("/datos", ArticleController.datosCurso);
router.get("/testController", ArticleController.test);

//Rutas
router.post("/save", ArticleController.save);
router.get("/articles/:last?", ArticleController.getArticles);
router.get("/article/:id", ArticleController.getArticle);
router.put("/article/:id", ArticleController.update);
router.delete("/article/:id", ArticleController.delete);
router.post("/uploadImage/:id", md_upload, ArticleController.upload);
router.get("/getImage/:image", ArticleController.getImage);
router.get("/search/:search", ArticleController.search);

module.exports = router;
