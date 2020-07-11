import React from "react";
import Slider from "../Slider";
import Sidebar from "../Sidebar";

export default function Peliculas() {
  return (
    <div>
      <Slider texto="Películas" size="slider-small" showButton={false} />
      <div className="center">
        <section id="content">
          <h1 className="subheader">Listado de películas</h1>
        </section>
        <Sidebar />
      </div>
    </div>
  );
}
