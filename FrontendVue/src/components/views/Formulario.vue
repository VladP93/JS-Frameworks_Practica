<template>
  <div>
    <Slider texto="Formulario" />
    <div class="center">
      <section id="content">
        <h2 class="subheader">Formulario</h2>
      </section>
      <Sidebar />
    </div>
  </div>
</template>

<script>
import Slider from "../Slider.vue";
import Sidebar from "../Sidebar.vue";
export default {
  name: "Formulario",
  components: {
    Slider,
    Sidebar,
  },
};
</script>

<style></style>
