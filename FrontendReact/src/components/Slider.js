import React from "react";
import { NavLink } from "react-router-dom";

export default function Slider(props) {
  const { texto, size, showButton } = props;

  return (
    <div id="slider" className={size}>
      <h1>{texto}</h1>
      {showButton && (
        <NavLink to="/blog" className="btn-white">
          Ir al Blog
        </NavLink>
      )}
    </div>
  );
}
