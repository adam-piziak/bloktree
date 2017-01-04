import * as types from '../mutations-types'

const state = {
  all: []
}

const mutations = {
  [types.CREATE_TASK] (state, { task }) {
    const unit = {
      id: state.all.length + 1,
      name: task.name,
      parent: task.parent,
      mode: task.mode,
      priority: task.priority,
      project: task.project
    }
    state.all.push(unit)
  },

  [types.EDIT_TASK] (state, { edit }) {
    const all = state.all
    for (let i in all) {
      if (all[i].id === edit.id) {
        all[i].name = edit.name
        all[i].parent = edit.parent
        all[i].mode = edit.mode
        all[i].priority = edit.priority
        all[i].project = edit.project
        break
      }
    }
  },

  [types.MAKE_GROUP] (state, { id }) {
    const all = state.all
    for (let i in all) {
      if (all[i].id === id) {
        const unit = all[i]
        unit.mode = 1
        all.splice(i, 1, unit)
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
  },

  [types.SET_ALL_TASKS] (state, tasks) {
    const all = state.all
    for (let i in tasks) {
      all.push(tasks[i])
    }
  }
}

export default {
  state,
  mutations
}
