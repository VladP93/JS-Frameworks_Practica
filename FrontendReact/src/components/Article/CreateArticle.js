import React, { useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import SimpleReactValidator from "simple-react-validator";
import swal from "sweetalert";

import Global from "../../Global";
import Sidebar from "../Sidebar";
import Slider from "../Slider";

export default function CreateArticle() {
  const url = Global.url;
  const [redirect, setRedirect] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
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

  const nuevoArticulo = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      axios.post(url + "save", formData).then((res) => {
        if (res.data.article) {
          if (file.length > 0) {
            //obtener id del articulo creado
            const articleId = res.data.article._id;
            //crear objeto formdata y anexar fichero
            const imageReady = new FormData();
            imageReady.append("file0", file[0], file[0].name);
            //Peticion ajax
            axios
              .post(url + "uploadImage/" + articleId, imageReady)
              .then((res) => {
                if (res.data.article !== null) {
                  //No debería de usarse el diferente de null pero cosas de JS :v
                  swal(
                    "Articulo creado",
                    "El artículo ha sido creado correctamente",
                    "success"
                  );
                  setRedirect(true);
                } else {
                  console.log("Algo salió mal");
                }
              });
          } else {
            swal(
              "Articulo sin imagen creado",
              "El artículo ha sido creado correctamente pero sin imagen",
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

  if (redirect) {
    return <Redirect to="/blog" />;
  }

  return (
    <div>
      <Slider texto="Crear nuevo artículo" size="slider-small" />
      <div className="center">
        <section id="content">
          <form className="mid-form" onSubmit={nuevoArticulo}>
            <div className="form-group">
              <label htmlFor="title">Título</label>
              <input
                type="text"
                name="title"
                onChange={(e) => onChange(e, "title")}
              />
              {validator.current.message("title", formData.title, "required")}
            </div>
            <div className="form-group">
              <label htmlFor="content">Contenido</label>
              <textarea
                name="content"
                onChange={(e) => onChange(e, "content")}
              ></textarea>
              {validator.current.message(
                "content",
                formData.content,
                "required"
              )}
            </div>
            <div className="form-group">
              <label htmlFor="file0">Imagen</label>
              <input
                type="file"
                name="file0"
                onChange={(e) => onChangeFile(e)}
              />
            </div>
            <input type="submit" value="Guardar" className="btn btn-success" />
          </form>
        </section>
        <Sidebar />
      </div>
    </div>
  );
}
