<template>
  <div id="app">
    <router-view/>
    <b-navbar>
      <b-nav-item href="#/" class="navb-container mx-auto" v-on:click="selected='Home';">
          <img class="navb" v-bind:class="{ 'selected': (selected === 'Home') }" src="./assets/home_menu_icon.png"/>
      </b-nav-item>
      <b-nav-item href="#/builder" class="navb-container mx-auto" v-on:click="selected='Builder';">
          <img class="navb" v-bind:class="{ 'selected': (selected === 'Builder') }" src="./assets/builder_menu_icon.png"/>
      </b-nav-item>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      selected: ''
    }
  },
  mounted(){
    this.selected = this.$route.name;
  }
}
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap.scss';

  $revial_dur: 0.6s;
  $default_dur: 0.3s;

  html {
    background: linear-gradient(180deg, #015B60 0%, #2C9DA3 100%) no-repeat;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  body {
    background: none;
    margin: 0;
  }

  .navbar {
    position: absolute;
    border-radius: 20px 20px 0px 0px;
    background-color: #9BDCE0;
    animation: reveal $revial_dur;
    animation-fill-mode: forwards;
    bottom: 0px;
    height: 4vh;
    width: 100vw;
  }

  .navb-container {
    transform: translateY(-50%);
    align-items: center;
    width: 6vh;
    height: 6vh;
    background-color: #9BDCE0;
    border-radius: 5px;
    cursor: pointer;
  }

  .navb {
    margin: auto;
    display: block;
    background-color: #174B50;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    opacity: 0.7;
    transition: $default_dur;
  }

  .navb.selected {
    opacity: 1;
  }

  .navb:active {
    background-color: #7BB8E1;
    transform: scale(0.5);
  }

  .nav-item > a {
    width: 100%;
    height: 100%;
  }

  .nav-link {
    padding: 0;
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

  @keyframes reveal {
    0% {
      transform: translateY(250%);
    }
    100% {
      transform: translateY(0%);
    }
  }
</style>
