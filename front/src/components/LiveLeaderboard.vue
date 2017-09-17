<template>
  <div id="liveleaderboard">
    <p>Leaderboard</p>
    <template v-for="leader in leaders">
      <live-leader-board-box :leader="leader" :key="leader.userID" v-if="leader.userID"></live-leader-board-box>
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

<style scoped lang="scss">
p{
  padding: 10px;
}
</style>
