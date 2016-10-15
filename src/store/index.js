import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tasks: [
    {
      name: 'study for physics',
      project: 'physics'
    }
  ],
  projects: [
    {
      name: 'physics'
    }
  ]
}

const mutations = {
  CREATE_TASK (state, task) {
    state.tasks.push({
      name: task
    })
    console.log(task)
  }
}

const actions = {
  createTask ({ commit }) {
    commit('CREATE_TASK')
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
