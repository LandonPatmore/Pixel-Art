<template>
  <div class="cpcolor" :style="style" @click="sendColor" @mouseover="changeOpacity" @mouseout="changeOpacity">
  </div>
</template>

<script>
export default {
  name: 'cpcolor',
  props: [
    'colorName',
    'colorHex'
  ],
  data() {
    return {
      style: {
        background: this.colorHex,
        opacity: null
      },
      color: this.colorName,
      active: false
    }
  },
  methods: {
    sendColor: function() {
      this.$emit('broadcastColor', this.style.background)
    },
    changeOpacity: function() {
      if (!this.active) {
        this.style.opacity = 0.7
        this.active = !this.active
      } else {
        this.style.opacity = null
        this.active = !this.active
      }
    }
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
