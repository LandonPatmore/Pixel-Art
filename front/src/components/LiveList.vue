<template>
  <div id="livelist">
    <p>Latest Changes</p>
    <section>
      <template v-for="(updated, index) in listArray">
        <live-list-box :update="updated" :key="index"></live-list-box>
      </template>
    </section>
  </div>
</template>

<script>
import LiveListBox from './LiveListBox'

export default {
  name: 'livelist',
  components: {
    LiveListBox
  },
  data() {
    return {
      listArray: []
    }
  },

  socket: {
    events: {
      feed_update: function(data) {
        this.listArray.unshift(data)
      }
    }
  }
}
</script>

<style scoped lang="scss">
p{
  padding: 10px;
}
</style>
