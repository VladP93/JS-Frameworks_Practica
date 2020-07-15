<template>
  <div>
    <Slider texto="Formulario" />
    <div class="center">
      <section id="content">
        <form class="mid-form" @submit.prevent="mostrarUsuario()">
          <div class="form-group">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" v-model="user.nombre" />
            <div v-if="submitted && !$v.user.nombre.required">
              Este campo es requerido
            </div>
            <div v-if="submitted && !$v.user.nombre.minLength">
              Este campo debe contener más caracteres
            </div>
          </div>

          <div class="form-group">
            <label for="apellidos">Apellidos</label>
            <input type="text" name="apellidos" v-model="user.apellidos" />
            <div v-if="submitted && !$v.user.apellidos.required">
              Este campo es requerido
            </div>
            <div v-if="submitted && !$v.user.apellidos.minLength">
              Este campo debe contener más caracteres
            </div>
          </div>

          <div class="form-group">
            <label for="bio">Biografia</label>
            <textarea name="bio" v-model="user.biografia"></textarea>
            <div v-if="submitted && !$v.user.biografia.required">
              Este campo es requerido
            </div>
          </div>

          <div class="form-group radibuttons">
            <input
              type="radio"
              name="genero"
              value="hombre"
              v-model="user.genero"
            />
            Hombre
            <input
              type="radio"
              name="genero"
              value="mujer"
              v-model="user.genero"
            />
            Mujer
            <input
              type="radio"
              name="genero"
              value="otro"
              v-model="user.genero"
            />
            Otro
          </div>
          <div class="clearfix"></div>
          <input type="submit" value="Enviar" class="btn btn-success" />
        </form>
      </section>
      <Sidebar />
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";
import Slider from "../Slider.vue";
import Sidebar from "../Sidebar.vue";
export default {
  name: "Formulario",
  components: {
    Slider,
    Sidebar,
  },
  validations: {
    user: {
      nombre: {
        required,
        minLength: minLength(2),
      },
      apellidos: {
        required,
        minLength: minLength(2),
      },
      biografia: {
        required,
      },
    },
  },
  data() {
    return {
      submitted: false,
      user: {
        nombre: "",
        apellidos: "",
        biografia: "",
        genero: "",
      },
    };
  },
  methods: {
    mostrarUsuario() {
      console.log(this.user);
      this.submitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return false;
      }
      alert("validación ok");
    },
  },
};
</script>

<style></style>
