import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";

// Vistas del router
import TestComponent from "./components/TestComponent.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Blog from "./components/views/Blog.vue";
import Formulario from "./components/views/Formulario.vue";
import Home from "./components/views/Home.vue";
import Pagina from "./components/views/Pagina.vue";
import Peliculas from "./components/views/Peliculas.vue";
import Error from "./components/views/Error.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/test",
    component: TestComponent,
  },
  {
    path: "/hola-mundo",
    component: HelloWorld,
  },
  {
    path: "/blog",
    component: Blog,
  },
  {
    path: "/formulario",
    component: Formulario,
  },
  {
    path: "/pagina",
    component: Pagina,
  },
  {
    path: "/peliculas",
    component: Peliculas,
  },
  {
    path: "/",
    component: Home,
  },
  {
    path: "*",
    component: Error,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
