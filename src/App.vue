<template>
  <div id="app">
    <div class="heading">
      <h4 class="death" v-if="showDeath">{{ hasDied }}</h4>
      <h4 id="score" v-else-if="score > 0"> score: {{ score }}</h4>
      <h4 id="title" v-else>PongHits</h4>
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
#app {
text-align: center;
}
.heading{
width:auto;
margin: auto;
  font-family: 'Courier New';

text-align: center;
}

h1 {
  text-align: center;
  font-family: 'Courier New';
  font-stretch: narrower;
  font-size: 50pt;
  color: rgb(2, 57, 2);
  margin-bottom: 0px;
}

h4 {
  text-align: center;
  font-family: 'Courier New';
  color: white;
  font-size: 30pt;
}

html {
  background-image: url("../swirly.gif");
  background-size: cover;
  font-size: 30pt;
  font-family: 'Courier New';
  text-align: center;
}

#score {
  text-align: center;
  font-family: 'Courier New';
  color: white;
  font-size: 30pt;
background-color: black;
}

.death {
   text-align: center;
  font-family: 'Courier New';
  color: red;
    font-size: 30pt;
background-color: black;
}
#title{background-color: black;}
</style>
