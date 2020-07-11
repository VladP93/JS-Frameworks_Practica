import React from "react";
import Slider from "../Slider";
import Sidebar from "../Sidebar";

export default function Page() {
  return (
    <div>
      <Slider texto="Página" size="slider-big" showButton={true} />
      <div className="center">
        <section id="content">
          <h1 className="subheader">Ejemplo de página</h1>
        </section>
        <Sidebar />
      </div>
    </div>
  );
}
