<template>
  <div class='project'>
    <span class="accent" :style="{ background: project.color }"></span>
    <div class="project-data">
      <span class="project-name">{{ project.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['project']
}
</script>

<style scoped lang="sass">
@import bourbon
$height: 50px
$width: 960px

.project
  height: $height
  width: $width
  background: white
  line-height: $height

  &:hover
    background: #f6f6f6
    cursor: pointer

.project-data
  vertical-align: top
  display: inline-block
  margin-left: 10px

  .project-name
    font-size: 1em
    display: inline-block

    &::first-letter
      text-transform: capitalize

.accent
  position: absolute
  display: inline-block
  height: $height + 1px //for border
  width: 2px
</style>
