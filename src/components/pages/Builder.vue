<template>
  <div class="builder">
    <div class="spells">
      <div v-for="(item, index) in spells" :key="index">
        <b-img :id="`spell${index}`" class="spell" :src="item.image" rounded/>
        <b-popover delay="150" :target="`spell${index}`" triggers="hover focus" :title="item.name" :content="item.info" placement="top"/>
      </div>
    </div>
  </div>
</template>

<script>
import lib from '../../data/lib.json';

export default {
  name: 'Builder',
  data () {
    return {
      spells: lib.classes.xelor.spells
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .builder {
    padding-left: 15vh;
    padding-right: 15vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .spells {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .spell {
    height: 10vh;
    width: 10vh;
    cursor: pointer;
  }
  .spell:hover {
    transform: translateY(-10px);
    animation-duration: 4s;
    transition: 0.4s;
  }
</style>
