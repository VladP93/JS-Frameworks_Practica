import React from "react";

import Slider from "../Slider";
import Sidebar from "../Sidebar";

export default function Blog() {
  return (
    <div>
      <Slider texto="Blog" size="slider-small" showButton={false} />
      <div className="center">
        <section id="content">
          <h1 className="subheader"> Listado de articulos</h1>
        </section>
        <Sidebar blog={true} />
      </div>
    </div>
  );
}
