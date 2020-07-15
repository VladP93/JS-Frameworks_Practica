import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import VueMoment from "vue-moment";
import moment from "moment";
import "moment/locale/es";

// Vistas del router
import TestComponent from "./components/TestComponent.vue";
import HelloWorld from "./components/HelloWorld.vue";
import Blog from "./components/views/Blog.vue";
import Formulario from "./components/views/Formulario.vue";
import Home from "./components/views/Home.vue";
import Pagina from "./components/views/Pagina.vue";
import Peliculas from "./components/views/Peliculas.vue";
import Search from "./components/views/Search.vue";
import Article from "./components/views/Article.vue";
import CreateArticle from "./components/views/CreateArticle.vue";
import EditArticle from "./components/views/EditArticle.vue";
import Error from "./components/views/Error.vue";

//Componentes
import Redirect from "./components/Redirect.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuelidate);

Vue.use(VueMoment, { moment });

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
    path: "/blog",
    component: Blog,
  },
  {
    path: "/articulo/:id",
    name: "article",
    component: Article,
  },
  {
    path: "/nuevo",
    name: "create",
    component: CreateArticle,
  },
  {
    path: "/editar/:id",
    name: "edit",
    component: EditArticle,
  },
  {
    path: "/buscar/:search",
    component: Search,
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
    path: "/redirect/:search",
    component: Redirect,
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
