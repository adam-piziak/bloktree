<template>
  <div class="projects">

    <input v-model='newProject.name'
           type="text"
           class="new-project-input"
           placeholder="add new project"
           @keydown.enter="createProject()" />

    <div class="projects-wrapper">
      <Project v-for="project in projects" :project="project"></Project>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Project from './projects/Project.vue'
export default {
  data () {
    return {
      newProject: {
        name: ''
      }
    }
  },
  components: {
    Project
  },
  computed: {
    ...mapGetters([
      'projects'
    ])
  },
  methods: {
    createProject () {
      let project = this.newProject
      this.$store.dispatch('createProject', project)
      this.newProject.name = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
@import bourbon

.new-project-input
  height: 30px
  width: 300px
  text-indent: 10px
  margin-left: 50%
  margin-top: 10px
  +transform(translateX(-50%))

.projects-wrapper
  margin-left: 50%
  margin-top: 10px
  +transform(translateX(-50%))
  width: 960px
  box-shadow: 0 2px 2px rgba(0,0,0,.2)
</style>
