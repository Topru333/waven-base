<template>
  <div class="home">
    <h1 class="white">Wakfu base alpha</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .white {
    color: white;
  }
  .home {
    padding: 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
