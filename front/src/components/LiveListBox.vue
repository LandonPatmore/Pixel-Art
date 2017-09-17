<template>
  <div class="livelistbox">
    <p><strong>{{update.user}}</strong></p>
    <p>Pixel: ({{update.posX}}, {{update.posY}}) // {{update.color}}</p>
  </div>
</template>

<script>
export default {
  name: 'livelistbox',
  props: [
    'update'
  ],
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
.livelistbox {
  border-bottom: 1px solid black;
  margin: 10px;
}

p {
  margin: 0 !important;
}
</style>
