"use strict";

const validator = require("validator");
const fs = require("fs");
const path = require("path");

const Article = require("../models/article");

const controller = {
  datosCurso: (req, res) => {
    console.log("Hola mundo");

    return res.status(200).send({
      Respuesta: "200",
      Mensaje: "Todo bien, todo correcto",
      Mensaje2: "Y yo que me alegro xDD",
    });
  },

  test: (req, res) => {
    return res.status(200).send({
      menssage: "Soy la acción test",
    });
  },

  save: (req, res) => {
    //Recoger datos
    var params = req.body;

    //Validar datos

    try {
      const validate_title = !validator.isEmpty(params.title);
      const validate_content = !validator.isEmpty(params.content);

      if (validate_title && validate_content) {
        //Crear objeto
        const article = new Article();

        //Asignar valores
        article.title = params.title;
        article.content = params.content;
        article.image = null;

        //Guardar
        article.save((err, articleStored) => {
          if (err || !articleStored) {
            return res.status(404).send({
              status: "error",
              err,
            });
          }

          //Reponse
          return res.status(200).send({
            status: "success",
            article: articleStored,
          });
        });
      } else {
        return res.status(200).send({
          status: "error",
          error: "Datos no válidos",
        });
      }
    } catch (err) {
      return res.status(200).send({
        status: "error",
        error: err,
      });
    }
  },

  getArticles: (req, res) => {
    const query = Article.find({});

    const last = req.params.last;
    if (last || last != undefined) {
      query.limit(5);
    }

    //Find
    query.sort("-_id").exec((err, articles) => {
      if (err) {
        return res.status(500).send({
          status: "error",
          err,
        });
      }

      if (!articles) {
        return res.status(404).send({
          status: "error",
          message: "No hay articulos",
        });
      }

      return res.status(200).send({
        status: "success",
        articles,
      });
    });
  },

  getArticle: (req, res) => {
    //Recoger el id de la URL
    const articleId = req.params.id;
    console.log(articleId);
    //Comprobar que existe
    if (!articleId || articleId == null) {
      return res.status(404).send({
        status: "error",
        message: "No encontrado",
      });
    }

    //Buscar el articulo
    Article.findById(articleId, (err, article) => {
      if (err || !article) {
        return res.status(500).send({
          status: "error",
          err,
        });
      }

      //Devolver el articulo
      return res.status(200).send({
        status: "success",
        article,
      });
    });
  },

  update: (req, res) => {
    //Recoger el id
    const articleId = req.params.id;

    //Recoger los datos
    const params = req.body;

    //Validar datos
    try {
      const validate_title = !validator.isEmpty(params.title);
      const validate_content = !validator.isEmpty(params.content);

      if (validate_title && validate_content) {
        //Find and update
        Article.findOneAndUpdate(
          { _id: articleId },
          params,
          { new: true },
          (err, articleUpdated) => {
            if (err) {
              return res.status(404).send({
                status: "error",
                err,
              });
            }
            if (!articleUpdated) {
              return res.status(404).send({
                status: "error",
                message: "No existe el artículo",
              });
            }

            return res.status(200).send({
              status: "success",
              articleUpdated,
            });
          }
        );
      } else {
        //Error
        return res.status(404).send({
          status: "error",
          message: "validación incorrecta",
        });
      }
    } catch (err) {
      return res.status(404).send({
        status: "error",
        err,
      });
    }

    //Response
  },

  delete: (req, res) => {
    //Recoger id
    const articleId = req.params.id;

    //Find and delete
    Article.findOneAndDelete({ _id: articleId }, (err, articleRemoved) => {
      if (err) {
        return res.status(200).send({
          status: "error",
          err,
        });
      }

      if (!articleRemoved) {
        return res.status(200).send({
          status: "error",
          message: "Articulo no encontrado para eliminar",
        });
      }

      return res.status(200).send({
        status: "success",
        articleRemoved,
      });
    });
  },

  upload: (req, res) => {
    //Configurar multiparty router/article.js

    //Recoger fichero
    var fileName = "Imagen no subida...";
    const articleId = req.params.id;

    if (!req.files) {
      return res.status(200).send({
        status: "error",
        menssage: fileName,
      });
    }

    //Conseguir nombre.ext
    const filePath = req.files.file0.path;

    //Nombre del archivo
    fileName = filePath.split("\\")[2];

    // LINUX o MAC
    //const fileName = filePath.split("/")[2];

    //Extensión
    const fileExt = filePath.split(".")[1];

    //Comprobar ext (solo img)
    if (comprobarExt(fileExt)) {
      //Si no es válido borrar
      fs.unlink(filePath, (err) => {
        return res.status(200).send({
          status: "error",
          menssage: "La extensión de la imagen no es válida",
        });
      });
    } else {
      //Subir
      //Buscar articulo y asignar nombre de la imagen y actualizar
      Article.findOneAndUpdate(
        { _id: articleId },
        { image: fileName },
        { new: true },
        (err, articleUpdated) => {
          console.log(articleId);

          if (err) {
            return res.status(500).send({
              status: "error",
              err,
            });
          }

          if (!articleUpdated) {
            return res.status(404).send({
              status: "error",
              message: "not Found",
            });
          }

          return res.status(200).send({
            status: "success",
            articleUpdated,
          });
        }
      );
    }
  },

  getImage: (req, res) => {
    const file = req.params.image;
    const pathFile = "./upload/articles/" + file;

    fs.exists(pathFile, (exist) => {
      if (exist) {
        return res.sendFile(path.resolve(pathFile));
      } else {
        return res.status(200).send({
          status: "error",
          menssage: "La image no existe",
        });
      }
    });
  },

  search: (req, res) => {
    //String para buscar
    const searchString = req.params.search;

    //Find OR
    Article.find({
      $or: [
        { title: { $regex: searchString, $options: "i" } },
        { content: { $regex: searchString, $options: "i" } },
      ],
    })
      .sort([["date", "descending"]])
      .exec((err, articles) => {
        if (err) {
          return res.status(500).send({
            status: "error",
            err,
          });
        }

        if (!articles || articles.length <= 0) {
          return res.status(400).send({
            status: "error",
            message: "No hay coincidencias",
          });
        }

        return res.status(200).send({
          status: "success",
          articles,
        });
      });
  },
}; //END controller

module.exports = controller;

function comprobarExt(ext) {
  console.log(ext);
  if (ext != "png" && ext != "jpg" && ext != "jpeg" && ext != "gif") {
    console.log("ret false");
    return true;
  } else {
    console.log("ret true");
    return false;
  }
}
