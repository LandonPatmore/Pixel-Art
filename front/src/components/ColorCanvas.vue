<template>
  <div id="colorCanvas">
    <section id="flexarea">
      <template v-for="(col, innerIndex) in overallRows">
        <component :key="innerIndex" :currentSelectedColor="colorPicked" :screenLocation="{x: 0, y: innerIndex}" :is="col.type" :socketColor="col.color"></component>
      </template>
    </section>
    <color-pallete @pickedColor="getSelectedColor"></color-pallete>
  </div>
</template>

<script>
import Pixel from './Pixel'
import ColorPallete from './ColorPallete'

export default {
  name: 'colorCanvas',
  components: {
    Pixel,
    ColorPallete
  },
  data() {
    return {
      colorPicked: null,
      overallRows: new Array(30)
    }
  },
  methods: {
    getSelectedColor: function(color) {
      this.colorPicked = color
    },
    initializePixelsBlank: function() {
      for (let i = 0; i < this.overallRows.length; i++) {
        this.overallRows.splice(i, 1, { type: Pixel, color: 'white' })
      }
    },
    setUpdatedPixel: function(pixel) {
      console.log(pixel)
      this.overallRows.splice(pixel.posY, 1, { type: Pixel, color: pixel.hex })
    }
  },
  created: function() {
    this.initializePixelsBlank()
  },
  socket: {
    events: {
      pixel_update: function(data) {
        this.setUpdatedPixel(data)
      }
    }
  }
}
</script>

<style lang="scss">
#colorCanvas {}

#flexarea {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  justify-content: center;
}
</style>
