<template>
  <div id="app">
    <section id="flexarea" v-for="(z, i) in 2" :key="i">
      <template v-for="(k, n) in 2">
        <pixel :key="n" :position='{x: i, y: n}' @coordinates='getCoords' @click.native="setColorPixel"></pixel>
      </template>
    </section>
    <h1>Coordinates</h1>
    <p>{{x}}, {{y}}</p>
    <color-pallete @pickedColor="getSelectedColor"></color-pallete>
    <h1>Color Selected</h1>
    <p>{{colorPicked}}</p>
  </div>
</template>

<script>
import Pixel from './components/Pixel'
import ColorPallete from './components/ColorPallete'

export default {
  name: 'app',
  components: {
    Pixel,
    ColorPallete
  },
  data() {
    return {
      x: 0,
      y: 0,
      colorPicked: null
    }
  },
  methods: {
    getCoords: function(args) {
      this.x = args.x
      this.y = args.y
    },
    getSelectedColor: function(color) {
      console.log(color)
      this.colorPicked = color
    },
    setColorPixel: function() {
      console.log('clicked')
      this.color = this.colorPicked ? this.colorPicked : ''
    }
  }
}
</script>

<style lang="scss">
#app {}

#flexarea {
  display: flex;
  width: 100px;
  justify-content: center;
  margin: 0 auto;

  .pixel:hover {
    background: blue;
  }
}
</style>
