<template>
  <div id="gamescreen">
    <live-list id="liveList"></live-list>
    <c-canvas id="canvas" :selectedColor="selectedColor"></c-canvas>
    <live-leaderboard id="leaderboard"></live-leaderboard>
    <section id="pallete">
      <router-link type="button" class="btn btn-primary" to="/fullboard" tag="button">View Full Area</router-link>
      <button type="button" class="btn btn-danger" @click="destroySession" tag="button">Logout</button>
      <color-pallete @pickedColor="getSelectedColor"></color-pallete>
    </section>
    <footer id="footer">
      Copyright © {{currentYear}}. Pyxl. All Rights Reserved.
    </footer>
  </div>
</template>

<script>
import CCanvas from './ColorCanvas'
import LiveList from './LiveList'
import LiveLeaderboard from './LiveLeaderboard'
import ColorPallete from './ColorPallete'

export default {
  name: 'gamescreen',
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
    },
    destroySession: function() {
      this.$session.destroy()
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto');

* {
  font-family: Roboto, sans-serif;
}

#gamescreen {
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
  background: white;
  grid-area: sideL;
  overflow-y: scroll;
}

#leaderboard {
  background: white;
  grid-area: sideR;
  overflow-y: scroll;
}

#footer {
  background: #222326;
  color: white;
  grid-area: footer;
  padding: 10px;
}
</style>
