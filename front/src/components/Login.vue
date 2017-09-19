<template>
  <div class="login">
    <h1>Welcome to Pyxl Place!</h1>
    <div id="loginBox">
      <h1>Please enter a user name.</h1>
      <div class="input-group">
        <input type="text" class="form-control" placeholder="user name..." v-model="nameInput">
        <span class="input-group-btn">
          <button class="btn btn-success" type="button" v-if="nameInput.length >= 1" @click="createUser">Go!</button>
          <button class="btn btn-danger" type="button" v-else disabled>Go!</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data() {
    return {
      nameInput: ''
    }
  },
  methods: {
    createUser: function() {
      axios.post('http://localhost:7000/api/user/register', {
        username: this.nameInput
      })
        .then(response => {
          console.log(response)
          this.$session.set('username', this.nameInput)
          this.$router.push({ name: 'Game' })
        }).catch(error => {
          console.log(error)
        })
    }
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
