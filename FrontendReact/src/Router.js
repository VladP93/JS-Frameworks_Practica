import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/*Pages*/
import Blog from "./components/Blog/Blog";
import Formulario from "./components/Formulario/Formulario";
import Home from "./components/Home/Home";
import Page from "./components/Page/Page";
import Peliculas from "./components/Peliculas/Peliculas";
import Search from "./components/Search/Search";
/*Components*/

import Test from "./components/Test";
import { Error } from "./components/Error";
import Header from "./components/Header";
import { Footer } from "./components/Footer";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {/*<Route path="/" component={Test} />*/}
        <Route exact path="/" component={Home} />
        <Route exact path="/inicio" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/formulario" component={Formulario} />
        <Route exact path="/page" component={Page} />
        <Route exact path="/peliculas" component={Peliculas} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/test" component={Test} />
        <Route component={Error} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}
