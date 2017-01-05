<template >
  <div class="auth-page">
    <header :class="{'premount': !mounted}">
      <span @click="presentLoginForm">Log in</span>
      <span @click="presentSignupForm">create account</span>
    </header>
    <p class="auth-title" :class="{'premount': !mounted}">Blok<span class="tree">Tree</span></p>
    <p class="description":class="{'premount': !mounted}">Prioritize tasks and projects</p>
    <div class="signin-wrapper">
      <div class="signin" :class="{'signup': action.signup, 'login': action.login, 'active': action.login || action.signup}">
        <input v-model="credentials.username"
               class="text-input username"
               type="text"
               placeholder="username"
               autofocus="autofocus"></input>
        <input v-model="credentials.password"
               class="text-input username"
               type="password"
               @keyup.enter="performAction"
               placeholder="password"></input>
        <input v-model="credentials.code"
               v-show="action.signup"
               class="text-input username"
               type="text"
               placeholder="invitation code"></input>
      </div>
        <input class="button submit"
               :class="{'premount': !mounted, 'signup': action.signup, 'login': action.login}"
               type="button"
               :value="buttonText"
               @click="performAction"/>
    </div>
    <!--<div class="logo"></div>-->
    <div class="open-source">
      <a href="https://github.com/adam-piziak/bloktree" target="_blank">
        <span>Project source</span>
        <div class="git-logo"></div>
      </a>
    </div>
  <div class="graphic" :class="{'premount': !mounted}"></div>
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
      mounted: false,
      credentials: {
        username: '',
        password: '',
        code: ''
      },
      action: {
        signup: false,
        login: false
      },
      buttonText: 'Create Account'
    }
  },
  mounted () {
    setTimeout(() => {
      this.mounted = true
    }, 200)
  },
  methods: {
    login () {
      auth.login(this, this.credentials, '/')
    },
    performAction () {
      if (this.action.login) {
        this.login()
      } else if (!this.action.login && !this.action.signup) {
        this.presentSignupForm()
      }
    },
    presentLoginForm () {
      this.action.signup = false
      this.action.login = true
      this.buttonText = 'Log in'
    },
    presentSignupForm () {
      this.action.signup = true
      this.action.login = false
      this.buttonText = 'Create Account'
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

.open-source
  background: transparent
  display: inline-block
  height: 60px
  position: absolute
  right: 10px
  bottom: 10px
  z-index: 50
  +transition(opacity .1s)
  opacity: 0.5


  span
    height: 60px
    line-height: 60px
    color: white
    display: inline-block
    float: left
    margin-right: 2px

  .git-logo
    +size(60px)
    background:
      color: transparent
      image: url($assets + 'git-logo.png')
      position: center center
      size: 70%
      repeat: no-repeat
    float: right

  &:hover
    cursor: pointer
    opacity: .9

  &:active
    opacity: 1

.logo
  +size(150px)
  background:
    color: transparent
    image: url($assets + 'logo.svg')
    position: center center
    size: 100%
  position: absolute
  top: 50%
  left: 50%
  opacity: 0.4
  +transform(translate(-50%, 40px))

header
  background: rgba(255, 255, 255, 0.05)
  height: 60px
  position: relative
  z-index: 20
  +transition(transform .2s)
  +transform(translateY(0))

  &.premount
    +transform(translateY(-60px))

  span
    display: inline-block
    height: 60px
    line-height: 60px
    float: right
    padding: 0 10px
    color: rgb(173, 173, 173)
    +transition(background .1s, color .1s)
    font-size: .9em
    font-weight: 600

    &:first-child
      margin-right: 20px

    &:hover
      cursor: pointer
      color: rgba(255, 255, 255, .8)

.description
  color: white
  opacity: 0.9
  //letter-spacing: 0.0em
  font-weight: 400
  position: absolute
  top: 430px
  left: 180px
  z-index: 10
  +transition(opacity .3s)

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
  opacity: 0.8
  +transition(opacity .8s)
  &.premount
    opacity: 0
.auth-page
  height: 100%
  background: $background
  overflow: hidden
  position: relative
  min-width: 512px

.premount
  opacity: 0
.auth-title
  text-align: center
  color: #d5d5d5
  width: 100%
  z-index: 10
  opacity: 1
  font-weight: 100
  margin-top: 80px
  font:
    size: 6em
  +transition(opacity .3s)

  &.premount
    opacity: 0

.tree
  color: #0fd524

  &:hover
    cursor: default

$height: 200px
$width-n: 350
$width: $width-n + px

.signin-wrapper
  display: block
  position: absolute
  background: transparent
  height: $height
  width: $width
  top: 370px
  left: 50%
  +transform(translateX(-50%))
  z-index: 100

  .signin
    display: block
    position: relative
    opacity: 0
    background: #d9d8d8
    height: 110px
    width: $width-n - 20px
    padding: 10px
    border-radius: 2px
    box-shadow: 0 3px 6px rgba(0, 0, 0, .5)
    overflow: hidden
    +transform(translateY(-30px) rotateX(-55deg))
    +transition(opacity .3s ease .1s, transform .2s ease .1s, height .25s)



    &.active
      opacity: 1
      +transform(translateY(0px) rotateX(0deg))

    &.login
      height: 75px



  .text-input
    background: #c4c4c4
    height: 30px
    width: 100%
    color: #212121
    margin: 4px 0
    text-indent: 8px
    outline: 0
    border: 0
    font-weight: 400
    letter-spacing: .03em
    border-radius: 2px
    +transition(background .1s)

    &::-webkit-input-placeholder
      color: #6e6e6e

    &:hover
      background: #bebebe

    &:focus
      background: #b8b6b6


  .button
    width: 150px
    +transform(translate(-50%, 0))
    position: absolute
    top: 50px
    left: 50%
    box-shadow: 0 3px 6px rgba(0, 0, 0, .5)
    height: 35px
    color: #4d4b4b
    border: 0
    outline: 0
    border-radius: 4px
    font-weight: 600
    background: #dbdbdb
    +transition(background .1s, top .25s ease, width .3s, border-radius .2s, opacity .3s)

    &.premount
      opacity: 0
    &.signup
      top: 150px
      width: $width
      border-radius: 2px

    &.login
      top: 110px
      width: $width
      border-radius: 2px

    &:hover
      cursor: pointer
      background: white

</style>
