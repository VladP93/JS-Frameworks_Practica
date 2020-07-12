import React, { useState, useEffect } from "react";
import axios from "axios";

import Slider from "../Slider";
import Sidebar from "../Sidebar";

export default function Blog() {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3900/api/articles")
      .then((res) => {
        setArticulos(res.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Slider texto="Blog" size="slider-small" showButton={false} />
      <div className="center">
        <section id="content">
          <h1 className="subheader"> Listado de articulos</h1>
          {articulos.map((articulo) => {
            return (
              <div key={articulo._id}>
                <h3>Articulo: {articulo.title}</h3>
                <p>{articulo.image}</p>
                <p>{articulo.content}</p>
                <p>{articulo.date}</p>
              </div>
            );
          })}
        </section>
        <Sidebar blog={true} />
      </div>
    </div>
  );
}
