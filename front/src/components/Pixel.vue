<template>
  <div class="pixel" :style="pixelStyle" @click="setChangeColor" @mouseover="previewChangeColor" @mouseout="previewChangeColor">
  </div>
</template>

<script>
export default {
  name: 'pixel',
  props: [
    'currentSelectedColor',
    'screenLocation',
    'socketColor'
  ],
  data() {
    return {
      pixelStyle: {
        background: this.socketColor
      },
      previewHoldBackground: null,
      active: false,
      x: this.screenLocation.x,
      y: this.screenLocation.y
    }
  },
  methods: {
    setChangeColor: function() {
      if (this.pixelStyle.background) {
        this.pixelStyle.background = this.currentSelectedColor
        this.previewHoldBackground = this.currentSelectedColor
        this.$socket.emit('pixel_changed', { posX: this.x, posY: this.y, hex: this.pixelStyle.background })
      } else {
        console.log('no color selected')
      }
    },
    previewChangeColor: function() {
      if (!this.active) {
        this.previewHoldBackground = this.pixelStyle.background
        this.pixelStyle.background = this.currentSelectedColor
      } else {
        this.pixelStyle.background = this.previewHoldBackground
      }
      this.active = !this.active
    }
  },
  watch: {
    socketColor: function() {
      this.pixelStyle.background = this.socketColor
      console.log('socket changed the color')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pixel {
  width: 25px;
  height: 25px;
  border: 1px solid black;
}
</style>
