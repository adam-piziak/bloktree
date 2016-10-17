<template>
  <div class="task">
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

.task
  background: rgb(255, 255, 255)
  height: 40px

.task-name
  display: inline-block
  height: 100%
  line-height: 100%

</style>
