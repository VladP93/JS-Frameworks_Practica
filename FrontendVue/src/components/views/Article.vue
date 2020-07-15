<template>
  <div>
    <div class="center">
      <section id="content">
        <article class="article-item article-detail" v-if="article">
          <div class="image-wrap">
            <img
              :src="url + 'getImage/' + article.image"
              :alt="article.title"
              v-if="article.image"
            />
            <img
              src="../../assets/images/no-imagen.jpg"
              :alt="article.title"
              v-if="!article.image"
            />
          </div>

          <h1 class="subheader">{{ article.title }}</h1>
          <span class="date">
            {{ article.date | moment("from", "now") }}
          </span>
          <p>
            {{ article.content }}
          </p>

          <div class="clearfix"></div>

          <router-link :to="'/editar/' + article._id" class="btn btn-warning"
            >Editar</router-link
          >
          <a @click="deleteArticle(article._id)" class="btn btn-danger"
            >Eliminar</a
          >
        </article>
      </section>
      <Sidebar />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Global from "../../Global";
import Sidebar from "../Sidebar.vue";
import swal from "sweetalert";
export default {
  name: "Article",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      article: null,
    };
  },
  mounted() {
    this.getArticle(this.$route.params.id);
  },
  methods: {
    getArticle(articleId) {
      axios
        .get(this.url + "article/" + articleId)
        .then((res) => {
          if (res.data.status == "success") {
            this.article = res.data.article;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteArticle(articleId) {
      swal({
        title: "Estás seguro?",
        text: "Una vez borrado el articulo, no se puede recuperar",
        icon: "warning",
        buttons: [true, true],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(this.url + "article/" + articleId)
            .then((res) => {
              swal(
                "Articulo borrado",
                "El artículo se ha borrado exitosamente",
                "success"
              );
              this.$router.push("/blog");
            })
            .catch((err) => {
              swal("Error algo salió mal", err, "error");
            });
        } else {
          swal("No se ha borrado el artículo");
        }
      });
    },
  },
};
</script>

<style></style>
