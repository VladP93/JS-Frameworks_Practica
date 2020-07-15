import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";

import Global from "../../Global";
import Sidebar from "../Sidebar";
import Slider from "../Slider";
import noImage from "../../assets/images/no-imagen.jpg";

export default function EditArticle(props) {
  const url = Global.url;
  const id = props.match.params.id;
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });
  const [file, setFile] = useState([]);
  const validator = useRef(
    new SimpleReactValidator({
      messages: { required: "Este campo es requerido" },
    })
  );
  const [, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.target.value });
  };

  const onChangeFile = (e) => {
    setFile([...file, e.target.files[0]]);
  };

  const editarArticulo = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      axios.put(url + "article/" + id, formData).then((res) => {
        if (res.data.articleUpdated) {
          if (file.length > 0) {
            //obtener id del articulo creado
            const articleId = res.data.articleUpdated._id;
            //crear objeto formdata y anexar fichero
            const imageReady = new FormData();
            imageReady.append("file0", file[0], file[0].name);
            //Peticion ajax
            axios
              .post(url + "uploadImage/" + articleId, imageReady)
              .then((res) => {
                if (res.data.articleUpdated !== null) {
                  //No debería de usarse el diferente de null pero cosas de JS :v
                  swal(
                    "Articulo editado",
                    "El artículo ha sido editado correctamente",
                    "success"
                  );
                  setRedirect(true);
                } else {
                  console.log("Algo salió mal");
                }
              });
          } else {
            swal(
              "Articulo editado sin modificar imagen",
              "El artículo ha sido editado correctamente pero sin modificar la imagen",
              "success"
            );
            setRedirect(true);
          }
        } else {
          console.log("Error dentro de axios");
        }
      });
    } else {
      validator.current.showMessages();
      forceUpdate();
    }
  };

  useEffect(() => {
    axios.get(url + "article/" + id).then((res) => {
      setFormData(res.data.article);
    });
  }, [url, id]);

  if (redirect) {
    return <Redirect to="/blog" />;
  }

  return (
    <div>
      <Slider texto="Editar artículo" size="slider-small" />
      <div className="center">
        <section id="content">
          {formData.title ? (
            <form className="mid-form" onSubmit={editarArticulo}>
              <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={formData.title}
                  onChange={(e) => onChange(e, "title")}
                />
                {validator.current.message("title", formData.title, "required")}
              </div>
              <div className="form-group">
                <label htmlFor="content">Contenido</label>
                <textarea
                  name="content"
                  onChange={(e) => onChange(e, "content")}
                  defaultValue={formData.content}
                ></textarea>
                {validator.current.message(
                  "content",
                  formData.content,
                  "required"
                )}
              </div>
              <div className="form-group">
                <div className="image-wrap">
                  {formData.image !== null ? (
                    <img
                      style={{ width: "120px" }}
                      src={url + "getImage/" + formData.image}
                      alt={formData.title}
                    />
                  ) : (
                    <img
                      src={noImage}
                      style={{ width: "120px" }}
                      alt="Imagen no disponible"
                    />
                  )}
                </div>
                <label htmlFor="file0">Imagen</label>
                <input
                  type="file"
                  name="file0"
                  onChange={(e) => onChangeFile(e)}
                />
              </div>
              <input
                type="submit"
                value="Guardar"
                className="btn btn-success"
              />
            </form>
          ) : (
            <h2 className="subheader" style={{ color: "#319ab8" }}>
              Cargando
            </h2>
          )}
        </section>
        <Sidebar />
      </div>
    </div>
  );
}
