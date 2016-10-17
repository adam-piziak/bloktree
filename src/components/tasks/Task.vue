<template>
  <div class="task">
    <div class="done-checkbox" @click="deleteTask(unit.id)"></div>
    <div class="task-name"> {{ unit.name }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {}
  },
  props: ['unit'],
  methods: mapActions({
    deleteTask: 'deleteTask'
  })
}
</script>

<style scoped lang="sass">
@import bourbon

$height: 40px
$assets: '../../assets/'
.task
  background: rgb(255, 255, 255)
  height: $height

  &:hover
    background: rgb(245, 245, 245)
    cursor: pointer

.task-name
  display: inline-block
  height: $height
  line-height: $height
  vertical-align: top
  font:
    size: .9em

  &::first-letter
    text-transform: capitalize

$checksize: 17px
.done-checkbox
  +size($checksize)
  margin: (($height - $checksize)/2) 8px
  display: inline-block
  opacity: 0.8
  background:
    color: transparent
    image: url($assets + 'icons/check_box_unmarked.svg')
    size: 100%
    position: center center
    repeat: no-repeat

  &:hover
    cursor: pointer
    background:
      image: url($assets + 'icons/check_box_marked.svg')

</style>
