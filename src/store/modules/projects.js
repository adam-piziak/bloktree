import * as types from '../mutations-types'

const state = {
  all: [
    {
      id: 1,
      name: 'general',
      color: '#757575'
    },
    {
      id: 2,
      name: 'engineering',
      color: '#2196F3'
    },
    {
      id: 3,
      name: 'health',
      color: '#9C27B0'
    }
  ],
  colors: [
    {
      id: 1,
      name: 'red',
      hex: '#f44336'
    },
    {
      id: 2,
      name: 'pink',
      hex: '#E91E63'
    },
    {
      id: 3,
      name: 'purple',
      hex: '#9C27B0'
    },
    {
      id: 4,
      name: 'deep-purple',
      hex: '#673AB7'
    },
    {
      id: 5,
      name: 'indigo',
      hex: '#3F51B5'
    },
    {
      id: 6,
      name: 'blue',
      hex: '#2196F3'
    },
    {
      id: 7,
      name: 'light-blue',
      hex: '#03A9F4'
    },
    {
      id: 8,
      name: 'cyan',
      hex: '#00BCD4'
    },
    {
      id: 9,
      name: 'teal',
      hex: '#009688'
    },
    {
      id: 10,
      name: 'green',
      hex: '#4CAF50'
    },
    {
      id: 11,
      name: 'light-green',
      hex: '#8BC34A'
    },
    {
      id: 12,
      name: 'lime',
      hex: '#CDDC39'
    },
    {
      id: 13,
      name: 'yellow',
      hex: '#FFEB3B'
    },
    {
      id: 14,
      name: 'amber',
      hex: '#FFC107'
    },
    {
      id: 15,
      name: 'orange',
      hex: '#FF9800'
    },
    {
      id: 16,
      name: 'deep-orange',
      hex: '#FF5722'
    }
  ]
}

const mutations = {
  [types.CREATE_PROJECT] (state, { newProject }) {
    const project = {
      id: state.all.length + 1,
      name: newProject.name,
      color: newProject.color.hex
    }
    state.all.push(project)
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
