<template>
  <div id="app">
    <island/>
  </div>
</template>

<script>
import island from './components/island.vue'

export default {
  name: 'App',
  components: {
    island
  }
}
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
