<template>
  <div class="tasks-component">
    <input v-model='newTask.name' type="text" placeholder="add new task" @keydown.enter="createTask()">
    <p v-for="task in tasks">
      {{ task.name }}
    </p>
  </div>
</template>

<script>
// import { mapActions } from 'vuex'

export default {
  data () {
    return {
      newTask: {
        name: '',
        project: 'Physics'
      },
      projects: this.$store.state.projects
    }
  },
  methods: {
    createTask (task) {
      this.$store.commit('CREATE_TASK', this.newTask.name)
    }
  },
  computed: {
    tasks () {
      return this.$store.state.tasks
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">

</style>
