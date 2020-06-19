<template>
  <div id="app">
    <div class="heading">
      <h1>PONG</h1>
      <h4 v-if="showDeath"> {{hasDied}}</h4>
    <h4 id="score" v-else-if="score > 0"> score: {{ score }}</h4>
      <h4 v-else>single-player game</h4>
    </div>
    <my-canvas :startingX="startingX" @ball-death="setDeath" @bar-collision="collision">
    </my-canvas>
    <!-- <h1 v-if="showDeath">{{ hasDied }}</h1> -->
     <!-- <button @click="setToMove()">Hello</button> -->
  </div>
</template>

<script>
//import Ball from "./components/Ball.vue";
import MyCanvas from "./components/MyCanvas.vue";

export default {
  name: "App",
  components: {
    MyCanvas,
  },

  data() {
    return {
      showDeath: false,
      startingX: 25,
      score: 0,
    };
  },

  computed: {

    hasDied: function() {
      return "You lose!";
    },
  },

  methods: {

    setStartingX: function(){
      this.startingX = Number(Math.random() * 750);
      this.showDeath = false;
    },
    
    setDeath: function() {
      this.start = true;
      this.showDeath = true;
      this.setStartingX();
      this.score = 0;
      console.log(this.hasDied);
    },

    collision: function(){
      console.log("collision!");
      this.score++;
      console.log(this.score);
    }
  },
};
</script>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

*/

h1 {
  text-align: center;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  font-stretch:narrower;
  font-size: 50pt;
  color:rgb(2, 57, 2);
  margin-bottom: 0px;
}

h4 {
  text-align: center;
  /* font-style: italic; */
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: black;
}
/*
.heading {
  border: 1px solid black;
}
*/

html {
  background-color: rgb(166, 228, 166);
}

#score {
  /* float: right; */
  padding: 0px;
  text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

</style>
