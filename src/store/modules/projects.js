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
    },
    {
      id: 4,
      name: 'BlokTree',
      color: '#00BCD4'
    }
  ],
  colors: [
    {
      id: 1,
      name: 'red',
      hex: '#d32f2f'
    },
    {
      id: 2,
      name: 'pink',
      hex: '#C2185B'
    },
    {
      id: 3,
      name: 'purple',
      hex: '#7B1FA2'
    },
    {
      id: 4,
      name: 'deep-purple',
      hex: '#512DA8'
    },
    {
      id: 5,
      name: 'indigo',
      hex: '#303F9F'
    },
    {
      id: 6,
      name: 'blue',
      hex: '#1976D2'
    },
    {
      id: 7,
      name: 'light-blue',
      hex: '#0288D1'
    },
    {
      id: 8,
      name: 'cyan',
      hex: '#0097A7'
    },
    {
      id: 9,
      name: 'teal',
      hex: '#00796B'
    },
    {
      id: 10,
      name: 'green',
      hex: '#388E3C'
    },
    {
      id: 11,
      name: 'light-green',
      hex: '#689F38'
    },
    {
      id: 12,
      name: 'lime',
      hex: '#AFB42B'
    },
    {
      id: 13,
      name: 'yellow',
      hex: '#FBC02D'
    },
    {
      id: 14,
      name: 'amber',
      hex: '#FFA000'
    },
    {
      id: 15,
      name: 'orange',
      hex: '#F57C00'
    },
    {
      id: 16,
      name: 'deep-orange',
      hex: '#E64A19'
    }
  ]
}

const mutations = {
  [types.CREATE_PROJECT] (state, { newProject }) {
    const project = {
      id: state.all.length + 1,
      name: newProject.name,
      color: newProject.color
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
  },

  [types.SET_ALL_PROJECTS] (state, projects) {
    state.all.length = 0
    for (let i in projects) {
      state.all.push(projects[i])
    }
    state.all.unshift({
      id: 1,
      name: 'general',
      color: '#757575'
    })
  }
}

export default {
  state,
  mutations
}
