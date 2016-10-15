<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import auth from './auth/'
export default {
  data () {
    return {
      authenticated: auth.user.authenticated
    }
  },
  components: {

  }
}
</script>

<style lang="sass">
*
  margin: 0
  padding: 0
  font-family: 'Open Sans'

html, body
  height: 100%

#app
  height: 100%



$header-height: 50px
header
  height: $header-height
  width: 100%

#user
  background: pink
  display: inline-block
  float: right
  line-height: 100%
  height: 100%


  a
    line-height: $header-height

nav
  height: $header-height
  position: absolute
  left: 50%
  transform: translate(-50%, 0)

  a
    color: rgb(35, 34, 36)
    font-size: 1.3em
    display: inline-block
    padding: 0 10px
    height: $header-height
    line-height: $header-height
    text-decoration: none
    float: left

    &:hover
      background: rgba(0, 0, 0, 0.1)
      cursor: pointer

  .link-divider
    background: rgb(74, 74, 74)
    width: 1px
    margin-top: $header-height/4
    height: $header-height/2
    display: inline-block
    float: left

</style>
