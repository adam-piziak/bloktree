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
      hasChildren: false,
      project: task.project
    }
    state.all.push(unit)
  },

  [types.EDIT_TASK] (state, { edit }) {
    const all = state.all
    for (let i in all) {
      if (all[i].id === edit.id) {
        all[i].name = edit.name
        break
      }
    }
  },
  [types.MAKE_GROUP] (state, { id }) {
    const all = state.all
    for (let i in all) {
      if (all[i].id === id) {
        all[i].hasChildren = true
        let task = {
          id: state.all.length + 1,
          name: 'new task',
          parent: id,
          hasChildren: false
        }
        all.push(task)
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
