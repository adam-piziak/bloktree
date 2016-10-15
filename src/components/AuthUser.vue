<template>
  <div>
    username
    <input type="text"
           placeholder="username"
           v-model="credentials.username">
    </input>
    <br>
    password
    <input type="password"
           placeholder="password"
           v-model="credentials.password">
    </input>
    <br>
    <input type="button" value="authenticate" @click="submit"/>

  </div>
</template>

<script>
  import auth from '../auth'
  export default {
    data () {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: ''
      }
    },
    methods: {
      submit () {
        let credentials = {
          username: this.credentials.username,
          password: this.credentials.password
        }

        auth.login(this, credentials, 'secretquote')
      }
    }

  }
</script>
