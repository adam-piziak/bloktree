<template >
  <div class="auth-page">
    <p class="auth-title">BlokTree</p>
    <div class="signin-wrapper">
      <input type="text" v-model="credentials.username" placeholder="username" maxlength="50" class="i-auth-text" autofocus="autofocus">
      <input type="password" v-model="credentials.password" placeholder="password" maxlength="50" class="i-auth-text">
      <input type="button" value="Login" class="i-auth-submit" @click="submit">
    </div>
    <div class="overlay"></div>
  </div>

</template>
<script>
import auth from '../../auth'
export default {
  data () {
    return {
      credentials: {
        username: '',
        password: ''
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

$background: rgb(250, 250, 250)
$font-size: .9em

.auth-page
  height: 100%
  background: $background
  overflow: hidden
  position: relative
  min-width: 512px

.auth-title
  text-align: center
  color: rgb(147, 144, 144)
  width: 100%
  z-index: 10
  margin-top: 10px
  font:
    size: 8em

  &:hover
    cursor: default
.signin-wrapper
  display: inline-block
  position: absolute
  z-index: 15
  left: 50%
  top: 30%
  +transform(translate(-50%, -50%))
  +size(350px auto)
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
    background: rgb(142, 142, 142)
    +margin(10px null null null)
    padding: 5px
    color: rgb(237, 237, 237)
    outline: 0
    border: 0
    width: 100%
    font-size: $font-size
    border-radius: 2px
    +transition(200ms)
    //box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2)
    font-weight: bold
    letter-spacing: .1em

    &:hover
      cursor: pointer
      background: rgb(162, 162, 162)
      color: #eee
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2)

$block-width: 2000px
.overlay
  +size($block-width)
  background: rgba(41, 41, 41, 0.1)
  z-index: 5
  position: absolute
  right: 0
  bottom: -1500px
  +transform(rotateZ(20deg))
</style>
