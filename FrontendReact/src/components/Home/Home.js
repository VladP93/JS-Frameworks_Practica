import React from "react";
import Slider from "../Slider";
import Sidebar from "../Sidebar";
import Articles from "../Articles";

export default function Home() {
  return (
    <div>
      <Slider texto="Inicio" size="slider-big" showButton={true} />
      <div className="center">
        <section id="content">
          <h1 className="subheader"> Ultimos articulos</h1>
          <Articles home={true} />
        </section>
        <Sidebar />
      </div>
    </div>
  );
}
