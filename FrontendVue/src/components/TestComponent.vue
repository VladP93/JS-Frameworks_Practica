<template>
  <div>
    <section id="content">
      <h1>Test component</h1>
      <p>Ola ke ase me prueba como componente o ke ase?</p>
      <p>{{ texto }}</p>
    </section>
  </div>
</template>

<script>
export default {
  name: "TestComponent",
  data() {
    return {
      texto: "o me okupa de prop o ke ase?",
    };
  },
};
</script>

<style></style>
