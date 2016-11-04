<template>
  <div class="projects">

    <div class="creator">
      <span class="color-picker"
            :style="{ background: newProject.color.hex}">
      </span>
      <input v-model='newProject.name'
             type="text"
             class="new-project-name"
             placeholder="add new project"
             @keydown.enter="createProject()" />
      <div class="colors">
        <span v-show="creator.colorPickerActive"
              v-for="color in projectColors"
              class="color"
              @click.stop="setNewProjectColor(color)"
              :style="{ background: color.hex }">
        </span>
      </div>
    </div>

    <div class="projects-wrapper">
      <Project v-for="project in projectBlocks" :project="project"></Project>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Project from './projects/Project.vue'
export default {
  name: 'Projects',
  data () {
    return {
      newProject: {
        name: '',
        color: {
          id: 1,
          name: 'red',
          hex: '#f44336'
        }
      },
      creator: {
        colorPickerActive: true
      }
    }
  },
  components: {
    Project
  },
  computed: {
    projectBlocks () {
      let all = []
      for (let i in this.projects) {
        let project = {
          data: this.projects[i],
          tasks: []
        }
        for (let a in this.tasksByProject) {
          if (this.tasksByProject[a].id === this.projects[i].id) {
            project.tasks = this.tasksByProject[a].tasks
          }
        }
        all.push(project)
      }
      return all
    },
    ...mapGetters([
      'projects',
      'projectColors',
      'tasksByProject'
    ])
  },
  methods: {
    setNewProjectColor (data) {
      this.newProject.color = data
      // this.creator.colorPickerActive = false
    },
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

$creator-height: 50px
$size: 35px
.creator
  display: inline-block
  margin: 100px
  margin-left: 50%
  +transform(translateX(-50%))
  box-shadow: 0 2px 3px rgba(0, 0, 0, .4)
  position: relative
  z-index: 10

  .new-project-name
    height: $creator-height
    width: (16*$size) - $creator-height
    text-indent: 10px
    vertical-align: top
    border: 0
    outline: 0

  .color-picker
    display: inline-block
    +size($creator-height)
    float: left
    background: blue

    &:hover
      cursor: pointer
  .colors
    display: block
    width: 16*$size
    height: $size

    .color
      display: inline-block
      +size($size)
      float: left
      +transform-origin(center top)
      font:
        weight: 500
      text-align: center
      line-height: 30px
      opacity: 0.9
      z-index: 10
      position: relative
      +transition(.2s)

      &:first-child
        background: rgb(246, 246, 246)

      &:hover
        cursor: pointer
        opacity: 1
        z-index: 20
        +transform(scale(1.5))


.projects-wrapper
  position: relative
  z-index: 5
  margin-left: 50%
  margin-top: 10px
  +transform(translateX(-50%))
  width: 960px
  box-shadow: 0 2px 2px rgba(0,0,0,.2)
</style>
