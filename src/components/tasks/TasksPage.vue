<template>
  <div class="tasks">

    <Creator></Creator>

    <p v-if="noTasks" class="no-tasks-message">No tasks added yet</p>
    <div else class="tasks-wrapper">

      <div v-for="(priority, index) in priorityTree"
           v-if="(priority.length > 0 || drag.active) && index != 0"
           :class="{'dropover': index === drag.over, 'active': drag.active }"
           class="priority">

        <h1>priority {{index}}</h1>

        <Task v-for="task in priority"
              @dragEnd = 'dragEnd'
              @dragStart = 'dragStart'
              :task="task"
              :projects="projects"></Task>

        <div @drop="drop(index)"
             @dragover.prevent = 'drag.over = index'
             @dragleave.prevent = 'drag.over = 0'
             class="drop-wrapper"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Task from './Task.vue'
import Creator from './Creator.vue'

export default {
  name: 'Tasks',
  data () {
    return {
      newTask: {
        name: '',
        parent: 0,
        project: 1,
        mode: 0,
        priority: 0
      },
      creator: {
        projectPickerActive: false
      },
      drag: {
        over: 0,
        active: false,
        taskData: {}
      }
    }
  },
  components: {
    Task,
    Creator
  },
  computed: {
    project () {
      const id = this.newTask.project
      let project = {}
      for (let i in this.projects) {
        if (this.projects[i].id === id) {
          project = this.projects[i]
        }
      }
      return project
    },
    projectName () {
      return this.project.name
    },
    projectColor () {
      return this.project.color
    },
    noTasks () {
      if (this.tasks.length === 0) {
        return true
      } else {
        return false
      }
    },
    ...mapGetters({
      tasks: 'taskTrees',
      priorityTree: 'priorityTree',
      projects: 'projects'
    })
  },
  methods: {
    drop (p) {
      let task = this.drag.taskData
      task.priority = this.drag.over
      this.$store.dispatch('editTask', task)
      this.dragEnd()
    },
    dragEnd () {
      let comp = this
      setTimeout(function () {
        comp.drag.over = 0
        comp.drag.taskData = {}
        comp.drag.active = false
      }, 100)
    },
    dragStart (taskData) {
      this.drag.taskData = taskData
      let comp = this
      setTimeout(function () {
        comp.drag.active = true
      }, 20)
    },
    setNewProject (id) {
      this.newTask.project = id
      this.creator.projectPickerActive = false
    },
    createTask () {
      let task = this.newTask
      this.$store.dispatch('createTask', task)
      this.newTask.name = ''
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import bourbon

.drop-wrapper
  position: absolute
  top: 0
  left: 0
  +size(0)
.priority
  box-shadow: 0 2px 2px rgba(0,0,0,.2)
  min-height: 45px
  margin-top: 60px
  position: relative
  background: rgba(255, 255, 255, 0.5)

  &.active .drop-wrapper
    +size(100%)
    min-height: 45px

  &.dropover .drop-wrapper
    background: rgba(0, 254, 3, 0.025)
    outline: 1px solid green

  &:first-child
    margin-top: 40px
  h1
    position: absolute
    font:
      weight: 400
      size: .9em
    top: -25px
    text-transform: capitalize
    opacity: 0.7
.tasks-wrapper
  margin-left: 50%
  margin-top: 10px
  +transform(translateX(-50%))
  width: 960px
  position: relative
  z-index: 5

.no-tasks-message
  margin: 20px
  text-align: center
  font-style: italic
</style>
