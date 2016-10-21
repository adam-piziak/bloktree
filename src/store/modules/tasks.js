import * as types from '../mutations-types'

const state = {
  all: [
    {
      id: 1,
      parent: 0,
      hasChildren: true,
      name: 'Physics',
      project: {
        id: 2,
        name: 'Electrical Engineering',
        color: '#2196F3'
      }
    },
    {
      id: 2,
      parent: 1,
      hasChildren: false,
      name: 'Kinematics'
    },
    {
      id: 3,
      parent: 1,
      hasChildren: true,
      name: 'Homework'
    },
    {
      id: 4,
      parent: 3,
      hasChildren: false,
      name: 'Recitation'
    },
    {
      id: 5,
      parent: 3,
      hasChildren: false,
      name: 'Workshop 1'
    },
    {
      id: 6,
      parent: 0,
      hasChildren: false,
      name: 'Create recursive tasks',
      project: {
        id: 3,
        name: 'BlokTree',
        color: '#00BCD4'
      }
    }
  ]
}

const mutations = {
  [types.CREATE_TASK] (state, { task }) {
    console.log(task)
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
