<template>
  <div class='project'>
    {{ project.name}}
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
$height: 40px
$width: 960px

.project
  height: $height
  width: $width
  background: white
  margin-left: 50%
  +transform(translateX(-50%))
  line-height: $height

  &::first-letter
    text-transform: capitalize

</style>
