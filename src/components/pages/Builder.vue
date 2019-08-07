<template>
  <div class="builder">
    <div class="left_builder">
      <div id="classes_text">Classes:</div>
      <div class="wclasses-container">
        <div class="wclasses">
          <div v-for="(item, index) in classes"
              :key="index"
              class="wclass mx-auto"
              v-bind:class="{ 'selected': (selected_class === index) }"
              v-on:click="selected_class=index">
            <b-img :id="`class${index}`" :src="item.emblem_image" class="emblem"/>
          </div>
        </div>
      </div>
      <div class="characters">
        <div v-for="(item, index) in classes[selected_class].characters"
             :key="index"
             class="char_container mx-auto"
             v-bind:class="{ 'selected': (selected_character === index) }"
             v-on:click="selected_character=index">
          <b-img :id="`char${index}`" :src="item.image" class="char_image"/>
        </div>
      </div>
      <div class="specialty">
        <div class="skill_container">
          <b-img id="specialty_skill" :src="specialty.image" class="skill_image"/>
          <b-popover delay="150" target="specialty_skill" triggers="hover focus"
          :title="specialty.active_name.fr" :content="specialty.active_info.fr" placement="top"/>
        </div>
        <div class="passive">
          <div>{{specialty.passive.fr}}</div>
        </div>
      </div>
    </div>
    <div class="middle_builder">
    </div>
    <div class="right_builder">
    </div>
    <div class="spells">
    </div>
  </div>
</template>

<script>
import lib from '../../data/lib.json';

export default {
  name: 'Builder',
  data () {
    return {
      classes: lib.classes,
      selected_class: 'xelor',
      selected_character: 0
    }
  },
  methods: {

  },
  computed: {
    // a computed getter
    specialty: function () {
      // `this` points to the vm instance
      return this.classes[this.selected_class].characters[this.selected_character].specialty;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .builder {
    user-select: none;
    padding-top: 10vh;
    padding-left: 10vh;
    padding-right: 10vh;
    height: 80vh;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .left_builder {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 60vh;
    height: 100%;
  }

  .right_builder {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    //background-color: white;
    width: 60vh;
    height: 100%;
  }

  .middle_builder {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    //background-color: white;
    width: 20%;
    height: 100%;
    flex: 1;
  }

  .wclasses-container{
    margin-bottom: 1.5%;
    overflow-x:auto;
    overflow-y:hidden;
    width: 90%;
    border: 1px solid #CFE8EF;
    box-sizing: border-box;
    border-radius: 5px;
    border-style: solid;
  }

  .wclasses {
    display: flex;
    padding: 5px;
    flex-direction: row;
    width:100%;
    height: 100%;
    overflow: visible;
  }

  .wclass {
    opacity: 0.5;
    height: 100%;
    cursor: pointer;
    transition: 0.3s;
  }

  .wclass:hover {
    opacity: 1;
  }

  .wclass.selected {
    opacity: 1;
    background: radial-gradient(3em 3em at 50% 50%, #9BDCE0 5%, transparent 50%);
  }

  .emblem {
    height: 5vh;
    width: 4.7vh;
  }

  #classes_text {
    font-size: 2.5vh;
    padding-left: 5%;
    padding-bottom: 1%;
    width: 100%;
    color: white;
  }

  .characters {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    width: 90%;
    margin-bottom: 2%;
  }

  .char_container {
    width: 10vh;
    height: 10vh;
    border: 1px solid #CFE8EF;
    box-sizing: border-box;
    border-radius: 5px;
    border-style: solid;
    overflow: hidden;
    filter: grayscale(1);
    opacity: 0.7;
    transition: 0.3s;
    cursor: pointer;
  }

  .char_image {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    transition: 0.1s;
  }

  .char_container.selected {
    filter: grayscale(0);
    opacity: 1;
  }

  .char_container:hover {
    opacity: 1;
  }

  .specialty {
    display: flex;
    align-items: stretch;
    flex-direction: row;
    width: 100%;
    height: 6vw;
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 25%;
  }

  .skill_container {
    width: 10vh;
    height: 10vh;
    border: 1px solid #CFE8EF;
    box-sizing: border-box;
    border-radius: 5px;
    border-style: solid;
    overflow: hidden;
    cursor: pointer;
  }

  .skill_image {
    height: 100%;
    width: 100%;
  }

  .passive {
    font-size: 1.8vh;
    color: white;
    width: 11vw;
    height: 6vw;
    flex: 1;
    padding-left: 1vw;
  }

  .passive::before {
    content: 'Passive :'
  }
</style>
