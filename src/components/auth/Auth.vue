<template >
  <div class="auth-page">
    <p class="auth-title">Blok<span class="tree">Tree</span></p>
    <p class="description">Prioritize tasks and projects</p>
    <div class="signin-wrapper">
      <div class="signin">
        <input class="input-username"
               placeholder="Username"
               autofocus="autofocus"
               v-model="credentials.username"
               @keyup="checkUser"
        >
        <input class="button-auth" type="button" value="Next"/>
        </input>
      </div>
    </div>
    <!--
    <div class="signin-wrapper">
      <input type="text" v-model="credentials.username" placeholder="username" maxlength="50" class="i-auth-text" autofocus="autofocus">
      <input type="password" v-model="credentials.password" placeholder="password" maxlength="50" class="i-auth-text">
      <input type="button" value="Login" class="i-auth-submit" @click="submit">
    </div>
  -->
  <div class="graphic"></div>
  </div>

</template>
<script>
import auth from '../../auth'
import * as server from '../../lib/server/index'
let typingTimer
let time = 5000
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
    },
    checkUser () {
      clearTimeout(typingTimer)
      typingTimer = setTimeout(
        server.user.check(this.credentials.username, (err, exists) => {
          if (err) {
            console.error(err)
          } else if (exists) {
            console.log('user exists!')
          } else {
            console.log('user does not exist.')
          }
        }),
        time)
    }
  }
}
</script>

<style lang="sass">
@import "bourbon"

$background: #252525
$font-size: .9em
$assets: '../../assets/'

.description
  color: white
  opacity: 0.9
  //letter-spacing: 0.0em
  font-weight: 600
  position: absolute
  top: 380px
  left: 220px
  z-index: 10

.graphic
  height: 100%
  width: 100%
  background:
    color: transparent
    image: url($assets + 'graphic.svg')
    size: 100%
  position: absolute
  top: 0
  z-index: 0
.auth-page
  height: 100%
  background: $background
  overflow: hidden
  position: relative
  min-width: 512px

.auth-title
  text-align: center
  color: #d5d5d5
  width: 100%
  z-index: 10
  opacity: 1
  margin-top: 100px
  font:
    size: 6em

.tree
  color: #0fd524

  &:hover
    cursor: default

$height: 100px
$width: 300px

.signin-wrapper
  display: block
  position: absolute
  background: transparent
  height: $height
  width: $width
  top: 370px
  left: 50%
  +transform(translateX(-50%))
  overflow: hidden
  z-index: 100

  .signin
    display: block
    position: relative
    background: transparent
    height: $height
    width: $width

  .input-username
    width: 100%
    height: 38px
    outline: 0
    border: 0
    display: block
    position: relative
    border-radius: 2px
    text-indent: 10px
    font-weight: 600
    color: rgb(228, 228, 228)
    letter-spacing: .05em
    left: 50%
    +transform(translateX(-50%))
    background: rgba(255, 255, 255, 0.1)
    +transition(background .3s, box-shadow .3s, color .3s)

    &:focus
      background: rgb(240, 239, 239)
      color: rgb(59, 59, 59)
      box-shadow: 0 4px 5px rgba(0, 0, 0, 0.3)

  .button-auth
    margin-top: 10px
    width: 100%
    height: 38px
    font-weight: 600
    outline: 0
    border: 0
    opacity: 0
    background: rgb(230, 230, 230)
    color: rgb(50, 50, 50)

    &:hover
      cursor: pointer

    &:active
      background: rgb(255, 255, 255)




/*.signin-wrapper
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

</style>
