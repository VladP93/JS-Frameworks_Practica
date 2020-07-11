import React from "react";
import Slider from "../Slider";
import Sidebar from "../Sidebar";

export default function Home() {
  return (
    <div>
      <Slider texto="Inicio" size="slider-big" showButton={true} />
      <div className="center">
        <section id="content">
          <h1 className="subheader"> Ultimos articulos</h1>
        </section>
        <Sidebar />
      </div>
    </div>
  );
}
