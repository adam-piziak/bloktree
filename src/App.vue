<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import auth from './auth/'
export default {
  name: 'App',
  data () {
    return {
      authenticated: auth.user.authenticated
    }
  },
  mounted () {
    auth.checkAuth()
    this.$store.dispatch('setAllTasks')
    this.$store.dispatch('setAllProjects')
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

</style>
