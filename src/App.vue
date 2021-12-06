/* eslint-disable indent */
/* eslint-disable indent */
/* eslint-disable quotes */
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <ideal-component />
  </div>
</template>

<script>
/* eslint-disable */
import IdealComponent from "./components/utils/IdealComponent.vue";

export default {
  name: "App",
  components: {
    IdealComponent,
  },
};
/* eslint-enable */
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
