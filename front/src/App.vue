<template>
  <div id="app">
    <c-canvas></c-canvas>
  </div>
</template>

<script>
import CCanvas from './components/ColorCanvas'

export default {
  name: 'app',
  components: {
    CCanvas
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
#app {}
</style>
