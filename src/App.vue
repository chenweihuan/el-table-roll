<template>
  <div id="app">
    <Roll1 />
    <Roll2 />
  </div>
</template>

<script>
import Roll1 from './components/Roll1.vue'
import Roll2 from './components/Roll2.vue'

export default {
  name: 'App',
  components: {
    Roll1,
    Roll2
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
  display: flex;
}
</style>
