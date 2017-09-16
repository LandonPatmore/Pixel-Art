<template>
  <div class="pixel" @click="tellCoords">
  </div>
</template>

<script>
export default {
  name: 'pixel',
  props: [
    'position'
  ],
  data() {
    return {
      x: this.position.x,
      y: this.position.y
    }
  },
  methods: {
    getName: function() {
      console.log(this.x + ', ' + this.y)
    },
    tellCoords: function() {
      this.$emit('coordinates', { x: this.x, y: this.y })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pixel {
  background: red;
  width: 50px;
  height: 50px;
  border: 1px solid black;
}
</style>
