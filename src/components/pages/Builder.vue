<template>
  <div class="builder">
    <div class="skills">
      <div v-for="(item, index) in skills" :key="index">
        <b-img :id="`skill${index}`" class="skill"  :src="item.src" rounded/>
        <b-popover delay="180" :target="`skill${index}`" triggers="hover focus" :title="item.name" :content="item.info" placement="top"/>
      </div>
    </div>
  </div>
</template>

<script>
import jsonSkills from '../../data/skills.json';

export default {
  name: 'Builder',
  data () {
    return {
      skills: jsonSkills.skills
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .builder {
    padding-left: 8vw;
    padding-right: 8vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .skills {
    display: flex;
    justify-content: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .skill {
    height: 6.2vw;
    width: 6.2vw;
    cursor: pointer;
  }
  .skill:hover {
    transform: translateY(-10px);
    animation-duration: 4s;
    transition: 0.4s;
  }
</style>
