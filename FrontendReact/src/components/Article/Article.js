import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import Moment from "react-moment";
import "moment/locale/es";
import axios from "axios";
import Global from "../../Global";
import Sidebar from "../Sidebar";
import { Error } from "../Error";
import swal from "sweetalert";

import noImage from "../../assets/images/no-imagen.jpg";

export default function Article(props) {
  const [article, setArticle] = useState({});
  const [status, setStatus] = useState("");
  const [redirect, setRedirect] = useState(null);
  const id = props.match.params.id;
  const url = Global.url;

  useEffect(() => {
    axios
      .get(url + "/article/" + id)
      .then((res) => {
        setStatus("success");
        setArticle(res.data.article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url, id]);

  const deleteArticle = (id) => {
    swal({
      title: "Estás seguro?",
      text: "Una vez borrado el articulo, no se puede recuperar",
      icon: "warning",
      buttons: [true, true],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(url + "article/" + id)
          .then(() => {
            swal("El artículo ha sido borrado", {
              icon: "success",
            });
            setRedirect(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        swal("No se ha borrado el artículo");
      }
    });
  };

  if (redirect) {
    return <Redirect to="/blog" />;
  }

  return (
    <div className="center">
      <section id="content">
        {status === "success" ? (
          <article className="article-item article-detail">
            <div className="image-wrap">
              {article.image !== null ? (
                <img
                  src={url + "getImage/" + article.image}
                  alt={article.title}
                />
              ) : (
                <img src={noImage} alt="Imagen no disponible" />
              )}
            </div>

            <h1 className="subheader">{article.title}</h1>
            <span className="date">
              <Moment fromNow>{article.date}</Moment>
            </span>
            <p>{article.content}</p>

            <div className="form-group">
              <div className="clearfix"></div>
              <Link
                to={"/blog/editar/" + article._id}
                className="btn btn-warning"
              >
                Editar
              </Link>
              <button
                onClick={() => {
                  deleteArticle(article._id);
                }}
                className="btn btn-danger"
                style={{
                  marginTop: "12px",
                  paddingTop: "-inherit",
                }}
              >
                Eliminar
              </button>
            </div>

            <div className="clearfix"></div>
          </article>
        ) : (
          <Error />
        )}
      </section>

      <Sidebar />

      <div className="clearfix"></div>
    </div>
  );
}
