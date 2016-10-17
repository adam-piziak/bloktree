<template>
  <div class="tasks-component">

    <input v-model='newTask.name'
           type="text"
           class="new-task-input"
           placeholder="add new task"
           @keydown.enter="createTask(newTask)" />

    <p v-if="noTasks" class="no-tasks-message">No tasks added yet</p>
    <div else class="tasks-wrapper">
      <task v-for="task in tasks" :unit="task"></task>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Task from './tasks/Task.vue'

export default {
  data () {
    return {
      newTask: {
        name: ''
      }
    }
  },
  components: {
    Task
  },
  computed: {
    noTasks () {
      if (this.tasks.length === 0) {
        return true
      } else {
        return false
      }
    },
    ...mapGetters([
      'tasks'
    ])
  },
  methods: {
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

.new-task-input
  height: 30px
  width: 300px
  text-indent: 10px
  margin-left: 50%
  margin-top: 10px
  +transform(translateX(-50%))

.tasks-wrapper
  margin-left: 50%
  margin-top: 10px
  +transform(translateX(-50%))
  width: 960px
  box-shadow: 0 2px 2px rgba(0,0,0,.2)

.no-tasks-message
  margin: 20px
  text-align: center
  font-style: italic
</style>
