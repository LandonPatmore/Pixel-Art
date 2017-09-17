<template>
  <div id="app">
    <router-view @username="onUsername" :userName="tt"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      tt: ''
    }
  },
  methods: {
    onUsername: function(data) {
      this.tt = data
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
}
</style>
