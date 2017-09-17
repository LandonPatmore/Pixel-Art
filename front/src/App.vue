<template>
  <div id="app">
    <live-list id="liveList"></live-list>
    <c-canvas id="canvas"></c-canvas>
    <live-leaderboard id="leaderboard"></live-leaderboard>
    <div id="footer">
footer
    </div>
  </div>
</template>

<script>
import CCanvas from './components/ColorCanvas'
import LiveList from './components/LiveList'
import LiveLeaderboard from './components/LiveLeaderboard'

export default {
  name: 'app',
  components: {
    CCanvas,
    LiveList,
    LiveLeaderboard
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-areas: 
  "sideL middle sideR"
  "footer footer footer";

  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr 1fr 1fr;
}

#canvas{
  grid-area: middle;
}

#liveList{
  background: lightsalmon;
  grid-area: sideL;
}

#leaderboard{
  background: lightgreen;
  grid-area: sideR;
}

#footer{
  background: lightblue;
  grid-area: footer;
}
</style>
