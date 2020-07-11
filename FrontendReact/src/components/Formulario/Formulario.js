import React, { useState } from "react";
import Slider from "../Slider";
import Sidebar from "../Sidebar";

export default function Formulario() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    bio: "",
    genero: "",
  });

  const onChange = (e, type) => {
    setFormData({ ...formData, [type]: e.target.value });
  };

  const recibirForm = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <Slider texto="Formulario" size="slider-small" />
      <div className="center">
        <section id="content">
          <h2 className="subheader">Formulario base</h2>

          {formData.nombre != "" && (
            <div>
              <p>
                Nombre: <strong>{formData.nombre}</strong>
              </p>
            </div>
          )}
          {formData.apellidos != "" && (
            <div>
              <p>
                Apellidos: <strong>{formData.apellidos}</strong>
              </p>
            </div>
          )}
          {formData.bio != "" && (
            <div>
              <p>
                Biografía: <strong>{formData.bio}</strong>
              </p>
            </div>
          )}
          {formData.genero != "" && (
            <div>
              <p>
                Genero: <strong>{formData.genero}</strong>
              </p>
            </div>
          )}

          <form className="mid-form" onSubmit={recibirForm}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                name="nombre"
                onChange={(e) => onChange(e, "nombre")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="apellidos">Apellidos</label>
              <input
                type="text"
                name="apellidos"
                onChange={(e) => onChange(e, "apellidos")}
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Biografia</label>
              <textarea
                name="bio"
                onChange={(e) => onChange(e, "bio")}
              ></textarea>
            </div>

            <div
              className="form-group radibuttons"
              onChange={(e) => onChange(e, "genero")}
            >
              <input type="radio" name="genero" value="Hombre" /> Hombre
              <input type="radio" name="genero" value="Mujer" /> Mujer
              <input type="radio" name="genero" value="Otro" /> Otro
            </div>

            <div className="clearfix"></div>

            <input type="submit" value="Enviar" className="btn btn-success" />
          </form>
        </section>
        <Sidebar />
      </div>
    </div>
  );
}
