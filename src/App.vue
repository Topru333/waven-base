<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style  lang="scss">
  @import '~bootstrap/scss/bootstrap.scss';

  html {
    background-color: black;
  }
  body {
    background-color: black;
    margin: 0;
  }
  h1, h2 {
  font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
