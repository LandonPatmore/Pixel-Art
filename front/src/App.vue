<template>
  <div id="app">
    <section id="flexarea" v-for="i in 2" :key="i">
      <template v-for="n in 2">
        <pixel :key="n" :position='{x: i, y: n}' @coordinates='test'></pixel>
      </template>
    </section>
    <h1>Coordinates</h1>
    <p>{{x}}, {{y}}</p>
    <color-pallete></color-pallete>
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
      y: 0
    }
  },
  methods: {
    test: function(args) {
      console.log(args)
      this.x = args.x
      this.y = args.y
    }
  },
  computed: {
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
