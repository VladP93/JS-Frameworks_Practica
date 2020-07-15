<template>
  <div>
    <Slider texto="Blog" size="" />
    <div class="center">
      <section id="content">
        <h2 class="subheader">Blog</h2>
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
  name: "Blog",
  components: {
    Slider,
    Sidebar,
    Articles,
  },
  mounted() {
    this.getArticles();
  },
  data() {
    return {
      url: Global.url,
      articles: [],
    };
  },
  methods: {
    getArticles() {
      axios.get(this.url + "articles").then((res) => {
        if (res.data.status == "success") {
          this.articles = res.data.articles;
        }
      });
    },
  },
};
</script>

<style></style>
