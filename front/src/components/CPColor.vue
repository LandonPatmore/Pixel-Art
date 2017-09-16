<template>
  <div class="cpcolor" :style="style" @click="sendColor" @mouseover="changeOpacity" @mouseout="initialColor">
  </div>
</template>

<script>
export default {
  name: 'cpcolor',
  props: [
    'index'
  ],
  data() {
    return {
      possibleColors: [{ name: 'Red', hex: '#d10000' }, { name: 'Orange', hex: '#ff6622' }, { name: 'Yellow', hex: '#ffda21' }, { name: 'Green', hex: '#33dd00' }, { name: 'Blue', hex: '#1133cc' }, { name: 'Pink', hex: '#FF69B4' }, { name: 'Purple', hex: '#330044' }, { name: 'Black', hex: '#000000' }, { name: 'White', hex: '#FFFFFF' }],
      name: null,
      style: {
        background: null,
        opacity: null
      }
    }
  },
  methods: {
    sendColor: function() {
      this.$emit('broadcastColor', this.style.background)
    },
    changeOpacity: function() {
      this.style.opacity = 0.7
    },
    initialColor: function() {
      this.style.opacity = null
    }
  },
  created: function() {
    this.name = this.possibleColors[this.index].name
    this.style.background = this.possibleColors[this.index].hex
  }
}
</script>

<style lang="scss">
.cpcolor {
  width: 50px;
  height: 50px;
  border: 1px solid black;
}
</style>
