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

<style scoped lang="sass">
@import bourbon

header
  background: #FAFAFA
  letter-spacing: .01em
  height: 50px

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
  color: rgb(52, 52, 52)
  margin: 0 30px
  font:
    weight: 500
</style>
