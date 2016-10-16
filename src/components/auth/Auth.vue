<template >
  <div class="auth-page">
    <p class="auth-title">BlokTree</p>
    <div class="signin-wrapper">
      <input type="text" v-model="credentials.username" placeholder="username" maxlength="50" class="i-auth-text" autofocus="autofocus">
      <input type="password" v-model="credentials.password" placeholder="password" maxlength="50" class="i-auth-text">
      <input type="button" value="Login" class="i-auth-submit" @click="submit">
    </div>
  </div>

</template>
<script>
import auth from '../../auth'
export default {
  data () {
    return {
      credentials: {
        username: 'adam',
        password: 'fractalfeels'
      }
    }
  },
  methods: {
    submit () {
      auth.login(this, this.credentials, '/')
    }
  }
}
</script>

<style scoped lang="sass">
@import "bourbon"

$background: rgb(247, 247, 247)
$font-size: .9em

body
  background: $background

.auth-title
  text-align: center
  color: rgb(90, 175, 88)
  text-shadow: 0 3px 5px rgba(0, 0, 0, 0.15)
  padding-top: 50px
  font:
    size: 4em

  &:hover
    cursor: default
.signin-wrapper
  display: inline-block
  position: absolute
  left: 50%
  top: 30%
  +transform(translate(-50%, -50%))
  +size(300px auto)
  background: white
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.21)
  padding: 8px
  border-radius: 2px

  input.i-auth-text
    display: block
    outline: none
    border: 0
    text-indent: 10px
    height: 30px
    line-height: 30px
    width: 100%
    font-size: $font-size
    border-bottom: .1px solid rgba(0, 0, 0, 0.15)
    +transition

    &:focus
      border-bottom: .1px solid rgba(0, 0, 0, 0.45)

  input.i-auth-submit
    background: rgb(95, 207, 107)
    +margin(10px null null null)
    padding: 5px
    color: $background
    outline: 0
    border: 0
    width: 100%
    font-size: $font-size
    border-radius: 2px
    +transition(80ms ease-out)
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2)
    font-weight: bold
    letter-spacing: .1em

    &:hover
      cursor: pointer
      background: rgb(92, 212, 104)
      color: #eee
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2)
      margin-top: 9px
      margin-bottom: 1px

      &:active
        background: rgb(106, 218, 117)
        margin-top: 8px
        margin-bottom: 2px


</style>
