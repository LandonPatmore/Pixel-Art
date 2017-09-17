<template>
  <div class="login">
    <div id="loginBox">
      <h1>Please enter a user name.</h1>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="user name..." v-model="nameInput">
        <span class="input-group-btn">
          <router-link class="btn btn-success" type="button" v-if="nameInput.length >= 1" to="/board" tag="button">Go!</router-link>
          <button class="btn btn-danger" type="button" v-else disabled>Go!</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      nameInput: ''
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.login {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#loginBox {
  border: 1px solid black;
  border-radius: 10px;
  padding: 20px;
}
</style>
