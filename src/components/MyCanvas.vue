<template>
  <div class="canvas-wrapper">
    <canvas ref="my-canvas" @click="move"> </canvas>
    <div @click="alert()"> </div>
    <div class="play-buttons">
    </div>
  </div>
</template>

<script>
//code from https://www.digitalocean.com/community/tutorials/vuejs-vue-html5-canvas
export default {
  props: {
    startingX: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      provider: {
        context: null,
        canvas: null,
      },
      moving: false,
      Ballradius: 10,
      raf: this.raf,
      posx: this.startingX,
      posy: 0,
      barX: 340,
      barY: 470,
      vxBall: 2,
      vyBall: 5,
      colorBall: "black",
    };
  },

  provide() {
    return {
      provider: this.provider,
    };
  },

  mounted() {
    this.provider.context = this.$refs["my-canvas"].getContext("2d");
    this.provider.canvas = this.$refs["my-canvas"];
    this.provider.canvas.width = "750";
    let width = this.provider.canvas.width;
    this.provider.canvas.height = "500";

    window.addEventListener('keydown', (e) =>{
    if(e.keyCode === 37 && this.barX > 0){
      console.log("left");
      this.barX -= 40;
    }else if (e.keyCode === 39 && this.barX < width-100){
      console.log(this.barX)
      console.log(width);
      console.log("right");
      this.barX += 40;
    }
    });

    this.drawBar();
  },

  methods: {
    drawBar: function() {
      let ctx = this.provider.context;
      ctx.beginPath();
      ctx.fillRect(this.barX, this.barY, 100, 15);
      ctx.fill();
    },

    drawBall: function() {
      let ctx = this.provider.context;
      ctx.beginPath();
      ctx.arc(this.posx, this.posy, this.Ballradius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.colorBall;
      ctx.fill();
    },

    clear: function() {
      let ctx = this.provider.context;
      let canvas = this.provider.canvas;
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },

    move: function() {
      if (!this.moving) {
        this.moving = true;
        this.moveBall();
      } else {
        return;
      }
    },

    moveBall: function() {
      let height = this.provider.canvas.height;
      let width = this.provider.canvas.width;

      let ctx = this.provider.context;

      this.$emit("drawing-made");
      this.clear();

      ctx.clearRect(0, 0, width, height);

      this.drawBall();
      this.drawBar();
      this.posx += this.vxBall;
      this.posy += this.vyBall;

      if (this.posy + this.vyBall > height) {
        console.log("died!");

        this.moving = false;
        this.$emit("ball-death");
        this.vyBall = 5;
        this.posy = 20;
        this.barX = 340;
        ctx.clearRect(0, 0, width, height);
        this.drawBar();
        return;
      }
      if (
        this.posy <= this.barY + 15 &&
        this.posy >= this.barY &&
        this.posx <= this.barX + 100 &&
        this.posx >= this.barX
      ) {
        this.vyBall = -this.vyBall * 1.05;
        this.$emit("bar-collision");
      }

      if (this.posy + this.vyBall < 0) {
        this.vyBall = -this.vyBall;
      }

      if (this.posx + this.vxBall > width || this.posx + this.vxBall < 0) {
        this.vxBall = -this.vxBall;
      }

      this.raf = window.requestAnimationFrame(this.moveBall);
    },
  },
};
</script>

<style scope>
canvas {
  border: 3px solid black;
  border-radius: 5px;
  background-color: whitesmoke;
}

.canvas-wrapper {
  padding-top: 15px;
  margin: 0px auto;
  text-align: center;
}

.play-buttons {
  padding-top: 30px;
  padding-right: 0px;
  padding-left: 0px;
}

.play-buttons > button {
  text-align: center;
  padding: 40px;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 20pt;
  border: none;
  background-color: darkgray;
}
</style>
