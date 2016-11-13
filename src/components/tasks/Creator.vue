<template>
  <div class="creator" :class="{'project': creator.project, 'priority': creator.priority}">
    <div class="priority-picker-block"
         :class="{'active': creator.priority}"
         @click="creator.priority = !creator.priority" >
         <div class="priority-picker">
           <span v-if="!creator.priority" class="selected-priority">{{task.priority}}</span>
           <div v-else class="priorities">
             <span v-for="n in 15" class="priority" @click.stop="setPriority(n)">{{n}}</span>
           </div>
         </div>
    </div>
    <input v-model="task.name"
      type="text"
      class="new-task-input"
      @keyup.enter="createTask()"
      placeholder="Create new tasks . . ."/>
    <div class="project-picker" :class="{'active': creator.project}">
      <div class="wrapper">
        <span v-if="!creator.project"
              class="selected-project"
              @click="creator.project= !creator.project"
              :style="{'color': project.color}"> {{project.name}}</span>
        <input v-if="creator.project"
               class="project-input"
               @keyup.enter="creator.project = false"
               placeholder="Search project"
               autofocus="autofocus"
               type='text' />
        <div v-if="creator.project" class="projects">
          <div v-for="unit in projects"
               @click="setProject(unit.id)"
               :style="{'color': unit.color}"
               class="project">
            {{ unit.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Creator',
  data () {
    return {
      task: {
        name: '',
        priority: 1,
        project: 1,
        parent: 0,
        mode: 0
      },
      creator: {
        priority: false,
        project: false
      }
    }
  },
  watch: {
    'creator.project': function (data) {
      if (this.creator.project) {
        setTimeout(function () {
          document.getElementsByClassName('project-input')[0].focus()
        }, 300)
      }
    }
  },
  computed: {
    project () {
      let project = this.projects.find(x => x.id === this.task.project)
      if (!project) {
        return {
          name: 'General',
          color: 'gray',
          id: 1
        }
      } else {
        return project
      }
    },
    computed () {

    },
    ...mapGetters({
      'projects': 'projects'
    })
  },
  methods: {
    createTask () {
      let task = this.task
      this.$store.dispatch('createTask', task)
      this.task.name = ''
    },
    setProject (id) {
      this.task.project = id
      this.creator.project = false
    },
    setPriority (n) {
      this.task.priority = n
      this.creator.priority = false
    }

  }
}
</script>

<style scoped lang="sass">
@import bourbon

$c-height: 40px
$c-width: 550px
.creator
  display: inline-block
  height: $c-height
  width: $c-width
  position: relative
  left: 50%
  margin-top: 30px
  +transform(translateX(-50%))
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.3)
  background: #ffffff

  &.priority

    .new-task-input, .project-picker
      display: none

  &.project
    height: auto

    .new-task-input
      display: none

    .priority-picker-block
      display: none

  .new-task-input
    height: $c-height
    width: 300px
    text-indent: 10px
    border: 0
    outline: 0
    margin-left: 40px
    float: left
    background: transparent

  .priority-picker
    position: relative
    +size($c-height)

  .priority-picker-block
    +size($c-height)
    +transform(translate(-50%, -50%))
    position: absolute
    top: 50%
    left: $c-height / 2
    float: left

    .selected-priority
      display: inline-block
      position: absolute
      left: 50%
      top: 50%
      +transform(translate(-50%, -50%))
      +size($c-height)
      line-height: $c-height
      text-align: center
      border-radius: 50%
      color: rgb(84, 84, 84)
      +transition

      &:hover
        cursor: pointer

    .priorities
      width: $c-width

      .priority
        height: $c-height
        line-height: $c-height
        width: (($c-width -$c-height) / 14)
        text-align: center
        color: rgb(84, 84, 84)
        display: inline-block

        &:first-child
          width: $c-height

        &:hover
          background: #eee
          cursor: pointer


  .project-picker
    position: relative
    float: right
    display: inline-block
    height: $c-height
    width: 200px
    line-height: $c-height
    text-align: center
    text-transform: capitalize
    font-size: .9em

    .wrapper
      position: relative
      height: 100%
      width: 100%

    &.active
      width: $c-width
      min-height: $c-height
      height: auto

    .project-input
      position: absolute
      left: 0
      top: -40px
      height: $c-height
      width: $c-width
      outline: 0
      border: 0
      text-indent: 10px

    .selected-project
      display: inline-block
      position: absolute
      right: 0
      text-align: right
      margin-right: 15px
      height: $c-height
      width: 100%
      color: rgba(255, 255, 255, 0.9)
      letter-spacing: .04em
      font-weight: 400

      &:hover
        cursor: pointer

    .projects
      width: $c-width
      margin-top: 40px

      .project
        background: white
        text-align: left
        text-indent: 10px

        &:hover
          background: #eee
          cursor: pointer
</style>
