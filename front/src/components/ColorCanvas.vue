<template>
  <div id="colorCanvas">
    <section id="flexarea" v-for="(rows, outterIndex) in overallRows" :key="outterIndex">
      <template v-for="(col, innerIndex) in rows">
        <component :key="innerIndex" :currentSelectedColor="colorPicked" :screenLocation="{x: outterIndex, y: innerIndex}" :is="col.type" :socketColor="col.color"></component>
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
        for (let j = 0; j < this.overallRows[i].length; j++) {
          this.overallRows[i].splice(j, 1, { type: Pixel, color: '#333' })
        }
      }
    },
    setUpdatedPixel: function(pixel) {
      console.log(pixel)
      this.overallRows[pixel.posX].splice(pixel.posY, 1, { type: Pixel, color: pixel.hex })
    }
  },
  created: function() {
    for (let i = 0; i < this.overallRows.length; i++) {
      this.overallRows[i] = new Array(30)
    }
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
