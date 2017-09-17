<template>
  <div id="app">
    <live-list id="liveList"></live-list>
    <c-canvas id="canvas" :selectedColor="selectedColor"></c-canvas>
    <live-leaderboard id="leaderboard"></live-leaderboard>
    <color-pallete @pickedColor="getSelectedColor" id="pallete"></color-pallete>
    <footer id="footer">
      Copyright © {{currentYear}}. Pyxl. All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import CCanvas from './components/ColorCanvas'
import LiveList from './components/LiveList'
import LiveLeaderboard from './components/LiveLeaderboard'
import ColorPallete from './components/ColorPallete'

export default {
  name: 'app',
  components: {
    CCanvas,
    LiveList,
    LiveLeaderboard,
    ColorPallete
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      selectedColor: null
    }
  },
  methods: {
    getSelectedColor: function(color) {
      this.selectedColor = color
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
  grid-template-areas: "sideL middle sideR" "sideL pallete sideR" "footer footer footer";

  grid-template-rows: 1fr auto auto;
  grid-template-columns: 0.2fr 1fr 0.2fr;
}

#canvas {
  grid-area: middle;
  overflow: scroll;
}

#pallete {
  grid-area: pallete;
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
