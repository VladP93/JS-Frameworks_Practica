import React from "react";

import Slider from "../Slider";
import Sidebar from "../Sidebar";
import Articles from "../Articles";

export default function Blog() {
  window.scrollTo(0, 0);
  return (
    <div>
      <Slider texto="Blog" size="slider-small" showButton={false} />
      <div className="center">
        <section id="content">
          <h1 className="subheader"> Listado de articulos</h1>
          <Articles />
        </section>
        <Sidebar blog={true} />
      </div>
    </div>
  );
}
