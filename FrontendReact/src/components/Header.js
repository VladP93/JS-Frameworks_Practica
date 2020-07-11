import React from "react";
import logo from "../assets/images/logo.svg";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header id="header">
      <div className="center">
        <div id="logo">
          <img src={logo} className="app-logo" alt="Logotipo" />
          <span id="brand">
            {" "}
            <strong>FrontEnd</strong>React{" "}
          </span>
        </div>

        <nav id="menu">
          <ul>
            <li>
              <NavLink to="/home" activeClassName="active">
                Inicio
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" activeClassName="active">
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/formulario" activeClassName="active">
                Formulario
              </NavLink>
            </li>
            <li>
              <NavLink to="/peliculas" activeClassName="active">
                Peliculas
              </NavLink>
            </li>
            <li>
              <NavLink to="/page" activeClassName="active">
                Página
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="clearfix"></div>
      </div>
    </header>
  );
}
