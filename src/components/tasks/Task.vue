<template>
  <div class="task">
    <span class="accent" :style="{ background: task.project.color }"></span>
    <div class="done-checkbox" @click="deleteTask(task.id)"></div>
    <div class="task-data">
      <span class="project-name" :style="{ color: task.project.color}"> {{ task.project.name }}</span>
      <span class="task-name"> {{ task.name }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  props: ['task'],
  methods: mapActions({
    deleteTask: 'deleteTask'
  })
}
</script>

<style scoped lang="sass">
@import bourbon

$height: 50px
$assets: '../../assets/'
.task
  background: rgb(255, 255, 255)
  border-bottom: 1px solid rgba(0, 0, 0, 0.1)
  height: $height

  &:hover
    background: rgb(245, 245, 245)
    cursor: pointer


.task-data
  display: inline-block
  height: $height
  vertical-align: top

  .project-name, .task-name
    float: left
    clear: both
    display: inline-block

    &::first-letter
      text-transform: capitalize

  .project-name
    height: (1/4)*$height
    line-height: (1/4)*$height
    margin-top: (1/8)*$height
    font-size: .8em

  .task-name
    height: (1/2)*$height
    line-height: (1/2)*$height
    margin-bottom: (1/8)*$height

$checksize: 17px
.done-checkbox
  +size($checksize)
  padding: (($height - $checksize)/2) 10px
  display: inline-block
  opacity: 0.7
  background:
    color: transparent
    image: url($assets + 'icons/check_box_unmarked.svg')
    size: 50%
    position: center center
    repeat: no-repeat

  &:hover
    cursor: pointer
    background:
      image: url($assets + 'icons/check_box_marked.svg')

.accent
  background: black
  display: inline-block
  height: $height + 1px //for border
  width: 2px
</style>
