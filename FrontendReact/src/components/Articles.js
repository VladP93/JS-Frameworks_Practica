import React, { useState, useEffect } from "react";
import axios from "axios";
import Moment from "react-moment";
import "moment/locale/es";
import { Link } from "react-router-dom";

import Global from "../Global";

import noImage from "../assets/images/no-imagen.jpg";

export default function Articles(props) {
  const url = Global.url;
  const [articulos, setArticulos] = useState([]);
  const [apiDir, setApiDir] = useState(url + "articles");
  const [status, setStatus] = useState("");
  //var status = "";
  const { home, search } = props;
  //var getArticles = "";

  // Variables var cambiandas a useState Hook para prevenir warnings

  useEffect(() => {
    if (home) {
      setApiDir(url + "articles/last");
      //      getArticles = url + "articles/last";
    } else {
      if (search) {
        setApiDir(url + "search/" + search);
        //        getArticles = url + "search/" + search;
      } else {
        setApiDir(url + "articles");
        //        getArticles = url + "articles";
      }
    }
    axios
      .get(apiDir)
      .then((res) => {
        setStatus(res.data.status);
        //settatus = res.data.status;
        setArticulos(res.data.articles);
      })
      .catch((err) => {
        setStatus("error");
        //status = "error";
        console.log(err);
      });
  }, [apiDir, status, home, search, url]);

  if (articulos.length >= 1) {
    return articulos.map((articulo) => {
      return (
        <div id="articles" key={articulo._id}>
          <article className="article-item" id="article-template">
            <div className="image-wrap">
              {articulo.image !== null ? (
                <img
                  src={url + "getImage/" + articulo.image}
                  alt={articulo.title}
                />
              ) : (
                <img src={noImage} alt="Imagen no disponible" />
              )}
            </div>

            <h2>{articulo.title}</h2>
            <span className="date">
              <Moment fromNow>{articulo.date}</Moment>
            </span>
            <Link to={"/blog/articulo/" + articulo._id}>Leer Más</Link>

            <div className="clearfix"></div>
          </article>
        </div>
      );
    });
  } else if (articulos.length === 0 && status === "") {
    return <h1 className="subheader">No hay elementos en la lista</h1>;
  } else {
    return (
      <h2 className="subheader" style={{ color: "#61dafb" }}>
        Cargando...
      </h2>
    );
  }
}
