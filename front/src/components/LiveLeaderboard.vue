<template>
  <div id="liveleaderboard">
    Leader Board
    <template v-for="leader in leaders">
      <live-leader-board-box :leader="leader"></live-leader-board-box>
    </template>
  </div>
</template>

<script>
import LiveLeaderBoardBox from './LiveLeaderboardBox'

export default {
  name: 'liveleaderboard',
  components: {
    LiveLeaderBoardBox
  },
  data() {
    return {
      leaders: null
    }
  },
  socket: {
    events: {
      leaderboard_update: function(data) {
        this.leaders = data.leaders
      }
    }
  }
}
</script>

<style lang="scss">
#livelist {}
</style>
