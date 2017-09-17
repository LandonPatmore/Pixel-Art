<template>
  <div id="app">
    <!-- <live-list id="liveList"></live-list> -->
    <c-canvas id="canvas"></c-canvas>
    <!-- <live-leaderboard id="leaderboard"></live-leaderboard> -->
    <footer id="footer">
      Copyright © {{currentYear}}. Pyxl. All Rights Reserved.
    </footer>
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
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
  font-family: Roboto, sans-serif;
}

#app {
  height: 100%;
  width: 100%;

  display: grid;
  grid-template-areas: "sideL middle middle" "footer footer footer";

  grid-template-rows: 1fr auto;
  grid-template-columns: 0fr 1fr;
}

#canvas {
  grid-area: middle;
}

#liveList {
  background: lightsalmon;
  grid-area: sideL;
  overflow-y: scroll;
}

#leaderboard {
  background: lightgreen;
  grid-area: sideR;
}

#footer {
  background: lightblue;
  grid-area: footer;
}
</style>
