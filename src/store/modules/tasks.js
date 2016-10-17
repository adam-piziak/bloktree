import * as types from '../mutations-types'

const state = {
  all: [
    {
      id: 1,
      name: 'run'
    },
    {
      id: 2,
      name: 'study for test'
    },
    {
      id: 3,
      name: 'finish final draft'
    }
  ]
}

const mutations = {
  [types.CREATE_TASK] (state, { task }) {
    let newTask = {
      name: task.name
    }
    state.all.push(newTask)
  },

  [types.EDIT_TASK] (state, { edit }) {
    const all = state.all
    for (let i in all) {
      if (all[i].id === edit.id) {
        all[i] = edit
        break
      }
    }
  },

  [types.DELETE_TASK] (state, { id }) {
    const all = state.all
    for (let i in all) {
      if (all[i].id === id) {
        all.splice(i, 1)
      }
    }
  }
}

export default {
  state,
  mutations
}
