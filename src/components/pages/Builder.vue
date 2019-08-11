<template>
  <div class="builder">
    <div class="left_builder">
      <div class="wclasses-container">
        <div class="wclasses">
          <div v-for="(item, index) in classes" :key="index"
              class="wclass mx-auto"
              v-bind:class="{ 'selected': (selected_class === index) }"
              v-on:click="selected_class=index; resetSelectedCharacter(); resetSpells();">
            <b-img :id="`class${index}`" :src="item.emblem_image" class="emblem non-draggable"/>
          </div>
        </div>
      </div>
      <div class="characters">
        <div v-for="(item, index) in classes[selected_class].characters" :key="index"
             class="char_container skeleton mx-auto"
             v-bind:class="{ 'selected': (selected_character === index) }"
             v-on:click="selected_character=index">
          <b-img :id="index" :src="item.image" class="char_image non-draggable"/>
        </div>
      </div>
      <div class="specialty">
        <div class="spell_container">
          <b-img id="specialty_spell" :src="specialty.image" class="spell_image non-draggable"/>
          <b-popover delay="150" target="specialty_spell" triggers="hover focus"
          :title="specialty.active_name.fr" :content="specialty.active_info.fr" placement="top"/>
        </div>
        <div class="passive">
          <div>{{specialty.passive.fr}}</div>
        </div>
      </div>
      <div id="spells_sidekicks">
        <div class="spells">
          <div v-for="index in 8" :key="`scontainer${index}`" :id="`scontainer${index}`"
               class="spell_container"
               v-bind:class="{'edit_mode': (spell_in_edit===index)}"
               v-on:click="editspell(index)">
            <b-img :src="selected_spells[index].image" class="spell_image non-draggable" v-if="selected_spells[index]"/>
            <b-popover delay="150" :target="`scontainer${index}`" triggers="hover focus"
            :title="selected_spells[index].name.fr" :content="selected_spells[index].info.fr" placement="top"
            v-if="selected_spells[index]"/>
          </div>
        </div>
        <div class="sidekicks">
        </div>
      </div>
    </div>
    <div class="middle_builder">
    </div>
    <div class="right_builder">
    </div>
    <div class="spell_choice" v-if="spell_in_edit!=''">
      <div v-for="(item, index) in classes[selected_class].spells" v-bind:key="index" :id="index"
          class="choice_container skeleton"
          v-bind:class="{'selected': (selected_spell_indexes.includes(index))}"
          v-on:click="setspell(index)">
        <b-img :src="item.image" class="spell_image non-draggable"/>
        <b-popover delay="150" :target="index" triggers="hover focus"
        :title="item.name.fr" :content="item.info.fr" placement="top"/>
      </div>
    </div>
    <div class="black_screen" v-on:click="spell_in_edit=''" v-if="spell_in_edit!=''">
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
      selected_character: Object.keys(lib.classes['xelor'].characters)[0],
      spell_in_edit: '',
      selected_spells: {},
      selected_spell_indexes: []
    }
  },
  methods: {
    editspell: function (index) {
      this.spell_in_edit = index;
    },
    setspell: function (index) {
      if (this.selected_spell_indexes.includes(index)) {
        return;
      }
      this.selected_spells[this.spell_in_edit] = this.currentClass.spells[index];
      this.selected_spell_indexes.push(index);
      this.spell_in_edit = '';
    },
    resetSelectedCharacter() {
      this.selected_character = Object.keys(lib.classes[this.selected_class].characters)[0];
    },
    resetSpells: function () {
      this.selected_spell_indexes = [];
      this.selected_spells = {};
    }
  },
  computed: {
    specialty: function () {
      return this.classes[this.selected_class].characters[this.selected_character].specialty;
    },
    currentClass: function () {
      return this.classes[this.selected_class];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .builder {
    user-select: none;
    padding-top: 8vh;
    padding-left: 8vh;
    padding-right: 8vh;
    height: 90vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: white;
  }

  .left_builder {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    width: 53.5vh;
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
    width: 100%;
    border: 1px solid #CFE8EF;
    box-sizing: border-box;
    border-radius: 5px;
    border-style: solid;
  }

  .wclasses {
    display: flex;
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
    padding: 0.5vh;

  }

  .wclass:hover {
    opacity: 1;
  }

  .wclass.selected {
    opacity: 1;
    background: radial-gradient(4vh 4vh at 50% 50%, #9BDCE0 5%, transparent 50%);
  }

  .emblem {
    height: 5vh;
    width: 4.7vh;
    margin: auto;
  }

  .characters {
    display: flex;
    align-items: flex-start;
    flex-direction: row;
    width: 100%;
    margin-bottom: 1.5%;
    border: 1px solid #CFE8EF;
    box-sizing: border-box;
    border-radius: 5px;
    border-style: solid;
    padding: 1%;
  }

  .char_container {
    width: 10vh;
    height: 10vh;
    border: 1px solid #174B50;
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
    height: 10vh;
    margin-bottom: 1.5%;
  }

  .spell_container {
    width: 10vh;
    height: 10vh;
    border: 1px solid #CFE8EF;
    box-sizing: border-box;
    border-radius: 5px;
    border-style: solid;
    overflow: hidden;
    cursor: pointer;
  }

  .spell_image {
    height: 100%;
    width: 100%;
    transform: scale(1.05);
  }

  .passive {
    user-select: text;
    font-size: 1.5vh;
    color: white;
    width: 11vw;
    height: 100%;
    flex: 1;
    padding-left: 1vw;
  }

  .passive::before {
    content: 'Passive :';
    font-size: 1.4em;
  }

  #spells_sidekicks {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    flex: 1;
    width: 100%;
  }

  .spells {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    width: 24vh;
    height: 44vh;
  }

  .spells > .spell_container {
    margin-right:1vh;
  }

  .spell_container.edit_mode {
    border: 1px solid #9BDCE0;
  }

  .spell_choice {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-content: space-between;
    border: 1px solid #CFE8EF;
    box-sizing: border-box;
    border-radius: 5px;
    border-style: solid;
    position: absolute;
    background-color: #174B50;
    width: 50vw;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .choice_container {
    width: 8vh;
    height: 8vh;
    margin: 0.1vh;
  }

  .choice_container.selected {
    filter: grayscale(1);
  }

  .char_container.skeleton,
  .choice_container.skeleton {
    background-repeat: no-repeat;
    background-image: linear-gradient(rgba(207,232,239,10%) 40px, transparent);
    background-size: 80% 80%;
    background-position: 50% 50%;
  }

  .black_screen {
    background-color: black;
    opacity: 0.5;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 0;
    left: 0;
  }

</style>
