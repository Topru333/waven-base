<template>
  <div class="home">
    <h1 class="red">Wakfu base alpha</h1>
    <router-link tag="li" to="/builder">
      <a>builder</a>
    </router-link>
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
  .red {
    color: #f00;
  }
  .home {
    padding: 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
