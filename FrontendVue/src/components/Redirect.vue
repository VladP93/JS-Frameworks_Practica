<template>
  <h1>Redirigiendo</h1>
</template>

<script>
export default {
  name: "Redirect",
  mounted() {
    var searchString = this.$route.params.search;
    this.$router.push("/buscar/" + searchString);
  },
};
</script>

<style></style>
