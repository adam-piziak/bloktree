<template>
  <div class="creator">
    <div class="priority-picker"
         :class="{'active': creator.priority}"
         @click="creator.priority = !creator.priority" >
      <span v-if="!creator.priority" class="selected-priority">{{ task.priority }}</span>
      <span v-if="creator.priority" class="priority-title">Priority:</span>
      <div class="priorities" v-if="creator.priority">
        <span v-for="n in 9"
              class="priority"
              @click="task.priority = n">{{n}}</span>
      </div>
    </div>
    <input v-model="task.name"
      type="text"
      class="new-task-input"
      placeholder="Create new tasks . . ."/>
      <div class="project-picker" :style="{'color': project.color}"> {{ this.project.name }} </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Creator',
  data () {
    return {
      task: {
        name: '',
        priority: 1,
        project: 1
      },
      creator: {
        priority: !false,
        project: false
      }
    }
  },
  computed: {
    project () {
      return this.projects.find(x => x.id === this.task.project)
    },
    ...mapGetters({
      'projects': 'projects'
    })
  },
  methods: {}
}
</script>

<style scoped lang="sass">
@import bourbon

$c-height: 40px
$c-width: 450px
.creator
  display: inline-block
  height: $c-height
  width: $c-width
  left: 50%
  +transform(translateX(-50%))
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3)
  background: #ffffff

  .new-task-input
    height: $c-height
    width: 300px
    text-indent: 10px
    border: 0
    outline: 0
    margin-left: 40px
    float: left
    background: transparent

  .priority-picker
    height: $c-height
    width: 40px
    position: absolute
    float: left
    line-height: 40px

    .selected-priority
      display: inline-block
      text-align: center
      width: 40px
      float: left

    .priority-title
      width: 80px
      float: left
      background: white
      text-align: center
      color: rgb(96, 96, 96)
    .priorities
      display: inline-block
      background: white
      width: $c-width - 80px
      float: left

      .priority
        display: inline-block
        width: 40px
        color: rgb(96, 96, 96)
        text-align: center

        &:hover
          background: rgb(240, 240, 240)

        &:first-child
          margin-left: 5px


    &.active
      width: $c-width
    &:hover
      cursor: pointer

    .priorities

  .project-picker
    display: inline-block
    height: $c-height
    width: 100px
    line-height: $c-height
    text-align: center
    float: right
    text-transform: capitalize
    font-size: .9em

    .project
      display: block
      clear: both
      padding: 0 10px
      border-bottom: 1px solid rgba(0, 0, 0, 0.1)
      font:
        weight: 500
      text-align: center
      height: 30px
      line-height: 30px
      overflow: hidden

      &::first-letter
        text-transform: capitalize

      &:first-child
        background: rgb(246, 246, 246)
        height: $c-height
        line-height: $c-height

      &:hover
        cursor: pointer
        background: #eee

</style>
