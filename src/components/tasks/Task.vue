<template>
  <div class="task" :class="{group: hasChildren}" @click.stop="state.expand = !state.expand">
    <span v-if="isRoot" class="accent" :style="{ background: task.project.color }"></span>
    <div class="core">
      <div class="done-checkbox"
            @click="deleteTask(task.id)"></div>
      <div class="task-data">
        <span v-if="isRoot"
              class="project-name"
              :style="{ color: task.project.color}">
              {{ task.project.name }}
        </span>
        <span v-if="!state.edit"
              class="task-name"
              @click.stop="state.edit=true"
              :class="{ group: hasChildren,
                        child: !isRoot,
                        root: isRoot }">
              {{ task.name }}
        </span>
        <input else
              class="task-name edit"
              @keydown.enter="state.edit=false"
              :class="{ group: hasChildren,
                        child: !isRoot,
                        root: isRoot }"
              v-model="task.name">
        </input>
      </div>
      <span v-if="hasChildren"
            class="expand"
            :class="{open: state.expand}"></span>
      <span class="border-bottom"></span>
    </div>
    <div v-if="hasChildren" class="children-wrapper" :class="{open: state.expand }">
      <Task v-for="task in task.children" :task="task"></Task>
      <div class="sub-task-creator" @click.stop="createTask()"></div>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Task',
  data () {
    return {
      state: {
        edit: false,
        expand: false
      }
    }
  },
  props: ['task'],
  computed: {
    hasChildren () {
      if (this.task.children) {
        return true
      }
      return false
    },
    isRoot () {
      if (this.task.project) {
        return true
      }
      return false
    }
  },
  methods: {
    createTask () {
      const task = {
        name: 'new task',
        parent: this.task.id,
        hasChildren: false,
        project: null
      }
      this.$store.dispatch('createTask', task)
    },
    ...mapActions({
      deleteTask: 'deleteTask'
    })
  }
}
</script>

<style scoped lang="sass">
@import bourbon

$height: 50px
$assets: '../../assets/'
.task
  background: rgb(255, 255, 255)
  min-height: $height
  position: relative
  overflow: hidden

  &.group
    background: rgb(246, 246, 251)

    &:hover
      background: rgb(244, 244, 249)

  &:hover
    background: rgb(252, 252, 252)
    cursor: pointer

.sub-task-creator
  height: 30px
  width: 100%
  padding-left: 30px
  text-indent: 20px
  outline: 0
  border: 0
  background:
    color: rgba(231, 229, 226, 0.2)
    image: url($assets + 'icons/plus.svg')
    position: center center
    repeat: no-repeat
    size: 2%

  &:hover
    background:
      color: rgba(231, 229, 226, 0.5)

.core
  +display(flex)
  width: 100%
  height: $height
  position: relative

.task-data
  display: inline-block
  height: $height
  width: 100%
  padding-left: 10px
  vertical-align: top

  .edit
    outline: 0
    border: 0
    background: rgb(240, 227, 227)

  .project-name, .task-name
    float: left
    clear: both
    display: inline-block

    &:hover
      cursor: text

    &::first-letter
      text-transform: capitalize

  .project-name
    height: (1/4)*$height
    line-height: (1/4)*$height
    margin-top: (1/8)*$height
    font-size: .7em

  .task-name.root
    height: (1/2)*$height
    line-height: (1/2)*$height
    margin-bottom: (1/8)*$height
    font-size: .9em

  .task-name.child
    height: $height
    line-height: $height
    font-size: .9em

.children-wrapper
  margin-left: 5px

  & > .task
    min-height: 0
    max-height: 0px
    +transition(200ms)

  & > .sub-task-creator
    height: 0
    +transition
  & > .group
    min-height: 0px
    height: 0
    max-height: 0px
    +transition(200ms)

  &.open > .task
    min-height: $height
    max-height: $height
  &.open > .task.group
    min-height: $height
    height: 100%
    max-height: none

  &.open > .sub-task-creator
    height: 30px
$checksize: 17px
.done-checkbox
  +size($checksize)
  padding: (($height - $checksize)/2) 12px
  display: inline-block
  float: left
  opacity: 0.7
  background:
    color: transparent
    image: url($assets + 'icons/check_box_unmarked.svg')
    size: 45%
    position: center center
    repeat: no-repeat

  &:hover
    cursor: pointer
    background:
      image: url($assets + 'icons/check_box_marked.svg')

.accent
  background: black
  display: block
  position: absolute
  left: 0
  min-height: $height + 1px //for border
  height: 100%
  width: 2px

.expand
  height: $height
  width: $height
  display: inline-block
  opacity: 0.6
  background:
    color: transparent
    image: url($assets + 'icons/chevron-down.svg')
    position: center center
    size: 50%
    repeat: no-repeat
  +transition(100ms)

  &.open
    +transform(rotate(180deg))

  &:hover
    opacity: 1

.border-bottom
  display: block
  position: absolute
  bottom: 0
  left: 50%
  +transform(translateX(-50%))
  height: 1px
  width: 98%
  background: rgba(0, 0, 0, 0.1)

</style>
