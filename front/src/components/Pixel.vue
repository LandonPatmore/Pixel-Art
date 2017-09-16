<template>
  <div class="pixel" :style="color" @click="sendColorChange(); tellCoords();" @mouseover="changeColor" @mouseout="initialColor">
  </div>
</template>

<script>
export default {
  name: 'pixel',
  props: [
    'position',
    'initial',
    'currentSelectedColor'
  ],
  data() {
    return {
      x: this.position.x,
      y: this.position.y,
      color: {
        background: this.initial
      },
      oldBackground: '#222'
    }
  },
  methods: {
    getName: function() {
      console.log(this.x + ', ' + this.y)
    },
    tellCoords: function() {
      this.$emit('coordinates', { x: this.x, y: this.y })
      this.$socket.emit('pixel_changed', { posX: this.x, posY: this.y, hex: this.color.background })
    },
    changeColor: function() {
      this.oldBackground = this.color.background
      this.color.background = this.currentSelectedColor
    },
    initialColor: function() {
      this.color.background = this.oldBackground
    },
    sendColorChange: function() {
      this.color.background = this.currentSelectedColor
      this.oldBackground = this.currentSelectedColor
    }
  },
  socket: {
    events: {
      confirm_pixel_change(msg) {
        console.log('something changed ' + msg.pixelChanged)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pixel {
  width: 10px;
  height: 10px;
}
</style>
