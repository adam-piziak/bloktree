<template>
  <div class="projects">

    <div class="creator">
      <input v-model='newProject.name'
             type="text"
             class="new-project-name"
             placeholder="add new project"
             @keydown.enter="createProject()" />
      <div class="color-picker">
        <span class="color"
              @click="creator.colorPickerActive = !creator.colorPickerActive"
              :style="{ color: newProject.color.hex}">
              {{ newProject.color.name }}
        </span>
        <span v-show="creator.colorPickerActive"
              v-for="color in projectColors"
              class="color"
              @click="setNewProjectColor(color)"
              :style="{ color: color.hex }">
              {{ color.name}}
        </span>
      </div>
    </div>

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
        name: '',
        color: {
          id: 1,
          name: 'red',
          hex: '#f44336'
        }
      },
      creator: {
        colorPickerActive: false
      }
    }
  },
  components: {
    Project
  },
  computed: {
    ...mapGetters([
      'projects',
      'projectColors'
    ])
  },
  methods: {
    setNewProjectColor (data) {
      this.newProject.color = data
      this.creator.colorPickerActive = false
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

$creator-height: 40px
.creator
  height: $creator-height
  display: inline-block
  margin-top: 10px
  margin-left: 50%
  +transform(translateX(-50%))
  background: pink
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2)
  position: relative
  z-index: 10
  border-radius: 5px

  .new-project-name
    height: $creator-height
    width: 300px
    text-indent: 10px
    vertical-align: top
    border: 0
    outline: 0

  .color-picker
    display: inline-block
    width: 150px
    float: right
    background: white

    .color
      display: block
      clear: both
      padding: 0 10px
      border-bottom: 1px solid rgba(0, 0, 0, 0.1)
      font:
        weight: 500
      text-align: center
      height: 30px
      line-height: 30px

      &:first-child
        background: rgb(246, 246, 246)
        height: $creator-height
        line-height: $creator-height

      &:hover
        cursor: pointer
        background: #eee


.projects-wrapper
  position: relative
  z-index: 5
  margin-left: 50%
  margin-top: 10px
  +transform(translateX(-50%))
  width: 960px
  box-shadow: 0 2px 2px rgba(0,0,0,.2)
</style>
