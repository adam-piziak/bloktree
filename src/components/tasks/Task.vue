<template>
  <div class="task">
    <div class="done-checkbox"></div>
    <div class="task-name"> {{ unit.name }} </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['unit']
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

.task-name
  display: inline-block
  height: $height
  line-height: $height
  vertical-align: top

  &::first-letter
    text-transform: capitalize

$checksize: 20px
.done-checkbox
  +size($checksize)
  margin: (($height - $checksize)/2) 10px
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
