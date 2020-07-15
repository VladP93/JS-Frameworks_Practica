<template>
  <div>
    <Slider texto="Inicio" showBtn="true" />
    <div class="center">
      <section id="content">
        <h2 class="subheader">Últimos artículos</h2>
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
  name: "Home",
  components: {
    Slider,
    Sidebar,
    Articles,
  },
  mounted() {
    this.getLastArticles();
  },
  data() {
    return {
      url: Global.url,
      articles: [],
    };
  },
  methods: {
    getLastArticles() {
      axios.get(this.url + "articles/true").then((res) => {
        if (res.data.status == "success") {
          this.articles = res.data.articles;
        }
      });
    },
  },
};
</script>

<style></style>
