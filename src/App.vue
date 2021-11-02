<template>
  <div id="app">
    <div class="heading">
      <h4 class="death" v-if="showDeath">{{ hasDied }}</h4>
      <h4 id="score" v-else-if="score > 0"> score: {{ score }}</h4>
      <h4 v-else>PONGHits</h4>
    </div>

   
    <my-canvas
      :startingX="startingX"
      @ball-death="setDeath"
      @bar-collision="collision"
    >
    </my-canvas>
  </div>
</template>

<script>
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
      return "Your score was " + this.score + ". Play again.";
    },
  },

  methods: {
    setStartingX: function() {
      this.startingX = Number(Math.random() * 750);
    },

    setDeath: function() {
      this.start = true;
      this.showDeath = true;
      this.setStartingX();
      console.log(this.hasDied);

      setTimeout(() => {
        this.showDeath = false;
        this.score = 0;
        console.log(this.showDeath);
      }, 2000);
    },

    collision: function() {
      console.log("collision!");
      this.score++;
      console.log(this.score);
    },
  },
};
</script>

<style>

h1 {
  text-align: center;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-stretch: narrower;
  font-size: 50pt;
  color: rgb(2, 57, 2);
  margin-bottom: 0px;
}

h4 {
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
  font-size: 30pt;
}

html {
  background-color: black;
  font-size: 30pt;
}

#score {
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: white;
  font-size: 30pt;
}

.death {
   text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  color: red;
    font-size: 30pt;

}
</style>
