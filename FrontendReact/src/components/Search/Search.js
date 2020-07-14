import React from "react";

import Slider from "../Slider";
import Sidebar from "../Sidebar";
import Articles from "../Articles";

export default function Search(props) {
  const busqueda = props.match.params.search;
  return (
    <div>
      <Slider
        texto={"Búsqueda: " + busqueda}
        size="slider-small"
        showButton={false}
      />
      <div className="center">
        <section id="content">
          <Articles search={busqueda} />
        </section>
        <Sidebar blog={true} />
      </div>
    </div>
  );
}
