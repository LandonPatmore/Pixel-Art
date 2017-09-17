<template>
  <div id="livelist">
    Latest Changes
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
        console.log(data)
        this.listArray.unshift(data)
      }
    }
  }
}
</script>

<style lang="scss">
#livelist {}
</style>
