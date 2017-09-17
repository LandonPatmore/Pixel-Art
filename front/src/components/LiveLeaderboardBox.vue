<template>
  <div id="liveleaderboardbox">
    <p>{{leader.userID}}</p>
    <p>Total: {{leader.numberPixelsChanged}}</p>
  </div>
</template>

<script>
export default {
  name: 'liveleaderboardbox',
  props: [
    'leader'
  ],
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
#liveleaderboardbox {
  border-bottom: 1px solid black;
  margin: 10px;
}

p {
  margin: 0;
}
</style>
