/* eslint-disable no-unused-vars */
<template>
  <div id="app">
    <manage></manage>
  </div>
</template>

<script>
import manage from './components/manage'
export default {
  name: 'App',
  components: {
    manage
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
  height: 100%;
}
</style>
