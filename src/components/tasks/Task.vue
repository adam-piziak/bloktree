<template>
  <div class="task" @click="setState()":class="{group: hasChildren}" @click.stop="state.expand = !state.expand">
    <span v-if="isRoot" class="accent" :style="{ background: projectColor }"></span>
    <div class="core">
      <div class="done-checkbox"
            @click="deleteTask(task.id)"></div>
      <div class="task-data">
        <span v-if="isRoot"
              class="project-name"
              :style="{ color: projectColor}">
              {{ projectName }}
        </span>
        <span v-if="!state.edit"
              class="task-name"
              @click.stop="state.edit=true"
              :class="{ group: hasChildren,
                        child: !isRoot,
                        root: isRoot }">
              {{ task.name }}
        </span>
        <input v-else
              class="task-name edit"
              @keydown.enter="editTask"
              @click.stop
              :class="{ group: hasChildren,
                        child: !isRoot,
                        root: isRoot }"
              v-model="edit.name">
        </input>
      </div>
      <div v-if="!hasChildren"
            class="make-group"
            @click="makeGroup(task.id)">
      </div>
      <span v-if="hasChildren"
            class="expand"
            :class="{open: state.expand}"></span>
      <span class="border-bottom"></span>
    </div>
    <div v-if="hasChildren" class="children-wrapper" :class="{open: state.expand }">
      <Task v-for="task in task.children" :task="task"></Task>
      <div class="sub-task-creator">
        <div class="done-checkbox"></div>
        <input placeholder="create new task"
               @click.stop
               @keydown.enter="createTask(newTask.name)"
               v-model="newTask.name" >
      <span class="border-bottom"></span>
      </div>
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
      },
      newTask: {
        name: ''
      },
      edit: {
        id: this.task.id,
        name: this.task.name
      }
    }
  },
  props: ['task', 'projects'],
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
    },
    projectColor () {
      let color = 'rgb(97, 97, 97)'
      for (let i in this.projects) {
        if (this.projects[i].id === this.task.project) {
          color = this.projects[i].color
        }
      }
      console.log(color)
      return color
    },
    projectName () {
      let name = 'general'
      for (let i in this.projects) {
        if (this.projects[i].id === this.task.project) {
          name = this.projects[i].name
        }
      }
      return name
    }
  },
  methods: {
    setState () {
      this.state.edit = false
    },
    createTask (name) {
      const task = {
        name: name,
        parent: this.task.id,
        hasChildren: false,
        project: null
      }
      this.$store.dispatch('createTask', task)
      this.newTask.name = ''
    },
    editTask () {
      this.$store.dispatch('editTask', this.edit)
      this.state.edit = false
    },
    makeGroup () {
      this.$store.dispatch('makeGroup', this.task.id)
    },
    ...mapActions({
      deleteTask: 'deleteTask'
    })
  }
}
</script>

<style scoped lang="sass">
@import bourbon

$height: 40px
$sub-task-creator-height: 40px
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

  &:hover > .core .make-group
    opacity: .6

    &:hover
      opacity: .8

.sub-task-creator
  background: white

  input
    height: 100%
    border: 0
    outline: none
    width: 900px
    text-indent: 10px

  .done-checkbox
    background:
      size: 38%
.core
  +display(flex)
  width: 100%
  height: $height
  position: relative

.make-group
  height: $height
  width: $height
  display: inline-block
  opacity: 0
  background:
    color: transparent
    image: url($assets + 'icons/group.svg')
    position: center center
    repeat: no-repeat
    size: 55%
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
    font-size: .6em

  .task-name.root
    height: (1/2)*$height
    line-height: (1/2)*$height
    margin-bottom: (1/8)*$height
    font-size: .7em

  .task-name.child
    height: $height
    line-height: $height
    font-size: .7em

.children-wrapper
  margin-left: 5px

  & > .task
    min-height: 0
    max-height: 0px
    +transition(200ms)

  & > .sub-task-creator
    height: 0px
    display: none
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
    height: $sub-task-creator-height
    display: block
$checksize: 17px
.done-checkbox
  +size($checksize)
  padding: (($height - $checksize)/2) 12px
  display: inline-block
  float: left
  opacity: 0.5
  background:
    color: transparent
    image: url($assets + 'icons/check_box_unmarked.svg')
    size: 40%
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
