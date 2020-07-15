<template src="./ArticleForm.html"> </template>

<script>
import Sidebar from "../Sidebar.vue";
import axios from "axios";
import Global from "../../Global";
import ArticleModel from "../../models/Article";
import { required } from "vuelidate/lib/validators";
import swal from "sweetalert";
export default {
  name: "EditArticle",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      file: "",
      article: new ArticleModel("", "", null, ""),
      submitted: false,
      isEdit: true,
    };
  },
  validations: {
    article: {
      title: {
        required,
      },
      content: {
        required,
      },
    },
  },
  mounted() {
    //  console.log(this.article);
    this.getArticle(this.$route.params.id);
  },
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
    },
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
    save() {
      this.submitted = true;
      var articleId = this.$route.params.id;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .put(this.url + "article/" + articleId, this.article)
          .then((res) => {
            if (res.data.status == "success") {
              if (
                this.file != null &&
                this.file != undefined &&
                this.file != ""
              ) {
                const formData = new FormData();

                formData.append("file0", this.file, this.file.name);
                axios
                  .post(this.url + "uploadImage/" + articleId, formData)
                  .then((res) => {
                    if (res.data.articleUpdated) {
                      swal(
                        "Artículo editado",
                        "El artículo se ha editado correctamente",
                        "success"
                      );
                      this.article = res.data.articleUpdated;
                      this.$router.push("/articulo/" + articleId);
                    } else {
                      alert("algo salió mal");
                    }
                  })
                  .catch((err) => {
                    swal("Error", err, "error");
                    console.log(err);
                  });
              } else {
                swal(
                  "Artículo editado sin imagen",
                  "El artículo se ha creado correctamente pero sin modificar la imagen",
                  "success"
                );
                this.$router.push("/articulo/" + articleId);
              }
            }
          })
          .catch((err) => {
            swal("Error", err, "error");
            console.log(err);
          });
      }
    },
  },
};
</script>

<style></style>
