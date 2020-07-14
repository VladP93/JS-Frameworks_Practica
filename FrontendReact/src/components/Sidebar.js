import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

export default function Sidebar(props) {
  var { blog } = props;
  const [searchParam, setSearchParam] = useState("");
  const [redirect, setRedirect] = useState(null);

  const onChange = (e) => {
    setSearchParam(e.target.value);
  };

  const doSearch = (e) => {
    e.preventDefault();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/redirect/" + searchParam} />;
  }

  return (
    <div>
      <aside id="sidebar">
        {blog && (
          <div id="nav-blog" className="sidebar-item">
            <h3>Puedes hacer esto</h3>
            <Link to="/blog/nuevo" className="btn btn-success">
              Crear artículo
            </Link>
          </div>
        )}

        <div id="search" className="sidebar-item">
          <h3>Buscador</h3>
          <p>Encuentra el artículo que buscas</p>
          <form onSubmit={doSearch}>
            <input
              type="text"
              name="search"
              onChange={onChange}
              onFocus={(e) => (e.target.value = "")}
            />
            <input type="submit" name="submit" value="Buscar" className="btn" />
          </form>
        </div>
      </aside>

      <div className="clearfix"></div>
    </div>
  );
}
