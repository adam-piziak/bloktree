import * as types from '../mutations-types'

const state = {
  all: []
}

const mutations = {
  [types.CREATE_TASK] (state, { task }) {
    const unit = {
      id: state.all.length + 1,
      name: task.name,
      project: task.project
    }
    state.all.push(unit)
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
