<template>
  <div class="colorPallete">
    <template v-for="(n, i) in possibleColors">
      <c-p :colorName="n.name" :colorHex="n.hex" :key="i" @broadcastColor="sendColorUser"></c-p>
    </template>
  </div>
</template>

<script>
import CP from './CPColor'

export default {
  name: 'colorPallete',
  components: {
    CP
  },
  data() {
    return {
      possibleColors: [{ name: 'Red', hex: '#d10000' }, { name: 'Orange', hex: '#ff6622' }, { name: 'Yellow', hex: '#ffda21' }, { name: 'Green', hex: '#33dd00' }, { name: 'Blue', hex: '#1133cc' }, { name: 'Pink', hex: '#FF69B4' }, { name: 'Purple', hex: '#330044' }, { name: 'Black', hex: '#000000' }, { name: 'White', hex: '#FFFFFF' }]
    }
  },
  methods: {
    sendColorUser: function(color, name) {
      this.$emit('pickedColor', color)
    }
  }
}
</script>

<style lang="scss">
.colorPallete {
  display: flex;
  justify-content: center;
}
</style>
