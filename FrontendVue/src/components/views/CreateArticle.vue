<template src="./ArticleForm.html"> </template>

<script>
import Sidebar from "../Sidebar.vue";
import axios from "axios";
import Global from "../../Global";
import ArticleModel from "../../models/Article";
import { required } from "vuelidate/lib/validators";
import swal from "sweetalert";
export default {
  name: "CreateArticle",
  components: {
    Sidebar,
  },
  data() {
    return {
      url: Global.url,
      file: "",
      article: new ArticleModel("", "", null, ""),
      submitted: false,
      isEdit: false,
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
  },
  methods: {
    fileChange() {
      this.file = this.$refs.file.files[0];
    },
    save() {
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      } else {
        axios
          .post(this.url + "save", this.article)
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
                  .post(
                    this.url + "uploadImage/" + res.data.article._id,
                    formData
                  )
                  .then((res) => {
                    if (res.data.articleUpdated) {
                      swal(
                        "Artículo creado",
                        "El artículo se ha creado correctamente",
                        "success"
                      );
                      this.article = res.data.articleUpdated;
                      this.$router.push("/blog");
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
                  "Artículo creado sin imagen",
                  "El artículo se ha creado correctamente pero sin imagen",
                  "success"
                );
                this.$router.push("/blog");
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
