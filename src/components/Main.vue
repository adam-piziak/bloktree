<template>
  <div id="main" v-else>
    <header>
      <h1>BlokTree</h1>
      <nav>
        <router-link to="/tasks">Tasks</router-link>
        <router-link to="/projects">Projects</router-link>
      </nav>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style scoped lang="sass">
@import bourbon

#main
  min-height: 100vh
  background: rgb(242, 242, 242)
header
  letter-spacing: .01em
  height: 50px
  background: white
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2)

nav
  display: inline-block
  position: absolute
  left: 50%
  +transform(translateX(-50%))

  a
    text-decoration: none
    color: black
    display: inline-block
    padding: 0 10px
    height: 50px
    line-height: 50px

    &:hover
      background: rgba(0, 0, 0, 0.09)

h1
  display: inline-block
  height: 50px
  line-height: 50px
  color: rgb(102, 102, 102)
  margin: 0 30px
  font:
    weight: 500
</style>
