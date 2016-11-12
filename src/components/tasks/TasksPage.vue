<template>
  <div class="tasks">

    <Creator></Creator>

    <p v-if="noTasks" class="no-tasks-message">No tasks added yet</p>
    <div else class="tasks-wrapper">
      <div v-for="(priority, index) in priorityTree" v-if="priority.length > 0"class="priority">
        <h1>priority {{index}}</h1>
        <Task v-for="task in priority" :task="task" :projects="projects"></Task>
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

.priority
  box-shadow: 0 2px 2px rgba(0,0,0,.2)
  margin-top: 60px
  position: relative

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
