<template>
  <div class="tasks">

    <div class="creator">
      <input v-model='newTask.name'
      type="text"
      class="new-task-input"
      placeholder="add new task"
      @keydown.enter="createTask()" />
      <div class="project-picker">
        <span class="project"
              @click="creator.projectPickerActive = !creator.projectPickerActive"
              :style="{ color: projectColor}">
              {{ projectName }}
        </span>
        <span v-show="creator.projectPickerActive"
              v-for="project in projects"
              class="project"
              @click="setNewProject(project.id)"
              :style="{ color: project.color }">
              {{ project.name}}
        </span>
      </div>
    </div>

    <p v-if="noTasks" class="no-tasks-message">No tasks added yet</p>
    <div else class="tasks-wrapper">
      <Task v-for="task in tasks" :task="task" :projects="projects"></Task>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Task from './Task.vue'

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
      }
    }
  },
  components: {
    Task
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
      projects: 'projects'
    })
  },
  methods: {
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

$creator-height: 40px
.creator
  display: inline-block
  height: $creator-height
  margin-left: 50%
  +transform(translateX(-50%))
  margin-top: 10px
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2)
  position: relative
  z-index: 10

  .new-task-input
    height: $creator-height
    width: 300px
    text-indent: 10px
    border: 0
    outline: 0

  .project-picker
    display: inline-block
    width: 200px
    float: right
    background: white

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
        height: $creator-height
        line-height: $creator-height

      &:hover
        cursor: pointer
        background: #eee


.tasks-wrapper
  margin-left: 50%
  margin-top: 10px
  +transform(translateX(-50%))
  width: 960px
  box-shadow: 0 2px 2px rgba(0,0,0,.2)
  position: relative
  z-index: 5

.no-tasks-message
  margin: 20px
  text-align: center
  font-style: italic
</style>
