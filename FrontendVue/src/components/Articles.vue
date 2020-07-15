<template>
  <section>
    <div v-if="!articles">
      <h1 class="subheader" style="color: #09a330">Cargando...</h1>
    </div>

    <div id="articlesList" v-if="articles && articles.length >= 1">
      <article
        class="article-item"
        id="article-template"
        v-for="article in articles"
        :key="article._id"
      >
        <div class="image-wrap">
          <img
            :src="url + 'getImage/' + article.image"
            :alt="article.title"
            v-if="article.image"
          />
          <img
            src="../assets/images/no-imagen.jpg"
            :alt="article.title"
            v-if="!article.image"
          />
        </div>
        <h2>{{ article.title }}</h2>
        <span class="date">
          {{ article.date | moment("from", "now") }}
        </span>
        <router-link :to="{ name: 'article', params: { id: article._id } }"
          >Leer más</router-link
        >
        <div class="clearfix"></div>
      </article>
    </div>

    <div v-else>
      <h2>No hay artículos encontrados</h2>
    </div>
  </section>
</template>

<script>
import Global from "../Global";
export default {
  name: "Articles",
  props: ["articles"],
  data() {
    return {
      url: Global.url,
    };
  },
};
</script>

<style></style>
