import * as types from '../mutations-types'

const state = {
  all: [
    {
      id: 1,
      name: 'physics',
      color: '2196F3'
    },
    {
      id: 2,
      name: 'health',
      color: '9C27B0'
    }
  ]
}

const mutations = {
  [types.CREATE_PROJECT] (state, { project }) {
    const unit = {
      id: state.all.length + 1,
      name: project.name,
      color: project.color
    }
    state.all.push(unit)
  },

  [types.DELETE_PROJECT] (state, { id }) {
    let all = state.all
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
