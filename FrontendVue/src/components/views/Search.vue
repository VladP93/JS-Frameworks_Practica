<template>
  <div>
    <Slider :texto="'Búsqueda: ' + searchString" size="" />
    <div class="center">
      <section id="content">
        <h2 class="subheader">Articulos encontrados</h2>
        <div id="articles" v-if="articles">
          <Articles :articles="articles" />
        </div>
      </section>
      <Sidebar />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Global from "../../Global";
import Slider from "../Slider.vue";
import Sidebar from "../Sidebar.vue";
import Articles from "../Articles.vue";
export default {
  name: "Search",
  components: {
    Slider,
    Sidebar,
    Articles,
  },
  mounted() {
    this.searchString = this.$route.params.search;
    this.getArticles(this.searchString);
  },
  data() {
    return {
      url: Global.url,
      articles: [],
      searchString: null,
    };
  },
  methods: {
    getArticles(searchString) {
      axios
        .get(this.url + "search/" + searchString)
        .then((res) => {
          if (res.data.status == "success") {
            this.articles = res.data.articles;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style></style>
