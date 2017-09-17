<template>
  <div class="fullboardview">
    <h1>Live Full View</h1>
    <color-canvas :fullboard="{height: '800px', width: '800px'}" id="board"></color-canvas>
  </div>
</template>

<script>
import ColorCanvas from './ColorCanvas'

export default {
  name: 'fullboardview',
  components: {
    ColorCanvas
  },
  data() {
    return {
      listArray: []
    }
  }
}
</script>

<style lang="scss">
.fullboardview {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
