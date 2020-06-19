

<script>
//this is an abstract component

export default {
  inject: ['provider'],

  props: {
    stopped: {
      type: Boolean,
      required: true,
    },
    posx: {
      type: Number,
      required: true,
    },
    poxy: {
      type: Number,
      require: true,
    }

  },

  data() {
    return {
      radius: 10,
      raf: this.raf,
      vx: 2,
      vy: 5,
      color: "green",
    };
  },


  methods: {
    draw: function() {
      let ctx = this.provider.context;
      ctx.beginPath();
      ctx.arc(this.posx, this.posy, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    },

    clear: function() {
      let ctx = this.provider.context;
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    resetPos: function(){
      this.posx = 0;
      this.posy = 20;
    },

    move: function() {
      if (this.stopped) {
        console.log(this.stopped);
        return;
      }

      this.$emit("drawing-made");
      this.clear();

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.draw();
      this.posx += this.vx;
      this.posy += this.vy;
      //this.vy *= 0.99;
      //this.vy += 0.25;
      if (this.posy + this.vy > this.canvas.height) {
        console.log("died!");
        this.resetPos();
        this.$emit("ball-death");
      }

      if (this.posy + this.vy < 0) {
        console.log(this.posx, this.posy);
        this.vy = -this.vy;
      }

      if (this.posx + this.vx > this.canvas.width || this.posx + this.vx < 0) {
        console.log(this.posx, this.posy);

        this.vx = -this.vx;
      }

      this.raf = window.requestAnimationFrame(this.move);
    },
  },
  render(){
    return this.draw;
  }
};
</script>

<style scope>
</style>
