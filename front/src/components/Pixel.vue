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
      // if ((this.$session.get('timeout') + 5000) >= Date.now()) {
      //   alert(((this.$session.get('timeout') + 5000) - Date.now()) / 1000 + ' seconds left until you can add a pixel.')
      //   return
      // }

      if (this.pixelStyle.background) {
        this.pixelStyle.background = this.currentSelectedColor
        this.previewHoldBackground = this.currentSelectedColor
        this.$socket.emit('pixel_changed', { posX: this.x, posY: this.y, hex: this.pixelStyle.background, user: this.$session.get('username') })
        this.$session.set('timeout', Date.now())
      } else {
        alert('No color was selected')
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pixel {
  width: 1%;
  height: 100%;
}
</style>
