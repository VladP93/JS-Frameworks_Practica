<template>
  <div>
    <div class="center">
      <section id="content">
        <h2 class="subheader">Peliculas</h2>
      </section>
      <Sidebar />
    </div>
  </div>
</template>

<script>
import Sidebar from "../Sidebar.vue";
export default {
  name: "Peliculas",
  components: {
    Sidebar,
  },
};
</script>

<style></style>
