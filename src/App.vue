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
  font-family: 'Raleway'

html, body
  height: 100%

#app
  height: 100%

</style>
