import React from "react";

export default function Sidebar(props) {
  var { blog } = props;
  return (
    <div>
      <aside id="sidebar">
        {!blog && (
          <div id="nav-blog" className="sidebar-item">
            <h3>Puedes hacer esto</h3>
            <a href="#" className="btn btn-success">
              Crear artículo
            </a>
          </div>
        )}

        <div id="search" className="sidebar-item">
          <h3>Buscador</h3>
          <p>Encuentra el artículo que buscas</p>
          <form>
            <input type="text" name="search" />
            <input type="submit" name="submit" value="Buscar" className="btn" />
          </form>
        </div>
      </aside>

      <div className="clearfix"></div>
    </div>
  );
}
