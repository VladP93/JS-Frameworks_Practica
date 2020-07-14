<template>
  <div id="app">
    <Header />
    <Slider />
    <div class="center">
      <router-view></router-view>
      <Sidebar />
    </div>
    <div class="clearfix"></div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Slider from "./components/Slider.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Slider,
    Sidebar,
    Footer,
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
@import "../src/assets/css/styles.css";
</style>
