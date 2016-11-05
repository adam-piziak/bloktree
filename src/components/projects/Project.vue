<template>
  <div class='project'>
    <div class="project-data">
      <span class="project-name" :style="{'color': project.data.color}">{{ project.data.name }}</span>
      <div class="project-tasks">
        <span class="project-task" v-for="task in project.tasks" :style="{'color': project.data.color}">{{task.name}}</span>
      </div>
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
  background: #fefefe

  &:hover
    background: #f6f6f6
    cursor: pointer

.project-data
  vertical-align: top
  display: inline-block
  position: relative
  width: $width
  height: $height
  border-bottom: 1px solid rgb(231, 230, 230)

  .project-name
    font-size: 1em
    display: inline-block
    position: absolute
    top: 5px
    left: 10px

    &::first-letter
      text-transform: capitalize

  .project-tasks
    position: absolute
    bottom: 5px
    left: 10px
    font-size: .7em

    .project-task
      margin: 0

      &::after
        content: '|'

      &:last-child::after
        content: ''
</style>
