<template>
  <div class="tasks-component">
    <input v-model='newTask.name'
           type="text"
           placeholder="add new task"
           @keydown.enter="createTask()" />
    <p v-for="task in tasks">
      {{ task.name }}
    </p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      newTask: {
        name: ''
      }
    }
  },
  computed: mapGetters({
    tasks: 'tasks'
  }),
  methods: {
    createTask () {
      let task = this.newTask
      this.$store.dispatch('createTask', task)
      this.newTask.name = ''
    },
    ...mapActions([])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
  
</style>
