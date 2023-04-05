<template>
  <div class="container is-flex is-align-items-center is-justify-content-center" style="height: 90vh;">
    <div class="box">
        <h1 class="title has-text-centered">Login</h1>
        <p class="subtitle">Área restrita</p>
        <hr>
        <label class="label has-text-left">Login</label>
        <input v-model="username" class="input" type="text" placeholder="Username">
        <label class="label has-text-left mt-5">Password</label>
        <input v-model="password" class="input" type="password" placeholder="Password">
        <button class="button is-primary mt-5" @click="login">Login</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default {
  name: 'loginView',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios.post('http://ipdoserver:porta/login/admin', {
        username: this.username,
        password: this.password
      })
        .then(response => {
            const token = response.data.token
            let decoded = jwtDecode(token);
            localStorage.setItem('token', token)
            localStorage.setItem('username', decoded.username)
            localStorage.setItem('exp', decoded.exp)
            // console.log(localStorage.getItem('username'))
            this.$router.push({ name: 'home' })
          })
        .catch(error => {
          console.log(error)

        })
    }
  }
}
</script>

<style>

</style>