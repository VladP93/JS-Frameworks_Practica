<template>
  <div>
    <Slider texto="Página" showBtn="true" />
    <div class="center">
      <section id="content">
        <h2 class="subheader">Pagina</h2>
        <div>
          <label for="edad">Edad:</label>
          <input type="number" v-model="edad" />
        </div>
        <p>
          Su edad es
          <strong style="color:red" v-if="edad >= 18">{{ edad }}</strong>

          <span v-if="edad >= 18"> años</span>
        </p>
        <strong style="color:red" v-if="edad < 18">{{ msg }}</strong>
      </section>
      <Sidebar />
    </div>
  </div>
</template>

<script>
import Slider from "../Slider.vue";
import Sidebar from "../Sidebar.vue";
export default {
  name: "Pagina",
  components: {
    Slider,
    Sidebar,
  },
  data() {
    return {
      edad: 27,
      msg: "Menor, no permitido",
    };
  },
};
</script>

<style></style>
