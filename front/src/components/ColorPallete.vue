<template>
  <div class="colorPallete">
    <template v-for="(n, i) in 9">
      <c-p :index="i" :key="i" @broadcastColor="sendColorUser"></c-p>
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
    }
  },
  methods: {
    sendColorUser: function(color) {
      this.$emit('pickedColor', color)
    }
  }
}
</script>

<style lang="scss">
.colorPallete {
  display: flex;
  justify-content: center;

  .cpcolor:hover {
    opacity: 0.6;
  }
}
</style>
