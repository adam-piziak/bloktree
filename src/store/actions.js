import Vue from 'vue'
import * as types from './mutations-types'
import * as server from '../lib/server/index'
const API_URL = 'http://127.0.0.1:3000'

export const createTask = ({ commit }, taskData) => {
  const token = localStorage.getItem('id_token')
  let task = {
    name: taskData.name,
    parent: taskData.parent,
    project: taskData.project,
    hasChildren: taskData.hasChildren,
    priority: 1
  }
  const data = {
    token,
    task
  }
  Vue.http.post((API_URL + '/task/create'), data).then((res) => {
    if (res.body.success) {
      commit(types.CREATE_TASK, { task })
    }
  }, (err) => {
    console.error('ERROR: ' + JSON.stringify(err))
  })
}

export const setAllTasks = ({ commit }) => {
  server.getTasks((err, tasks) => {
    if (err) {
      console.error(err)
    } else {
      commit(types.SET_ALL_TASKS, tasks)
    }
  })
}

export const editTask = ({ commit }, edit) => {
  commit(types.EDIT_TASK, { edit })
}

export const deleteTask = ({ commit }, id) => {
  server.deleteTask(id, (err, success) => {
    if (err) {
      console.error(err)
    } else {
      commit(types.DELETE_TASK, { id })
    }
  })
}

export const makeGroup = ({ commit }, id) => {
  commit(types.MAKE_GROUP, { id })
}

export const createProject = ({ commit }, project) => {
  let projectT = {
    name: project.name,
    color: project.color.hex
  }
  let newProject = projectT
  console.log(JSON.stringify(projectT))
  server.createProject(projectT, (err, success) => {
    if (err) {
      console.error(err)
    } else {
      commit(types.CREATE_PROJECT, { newProject })
    }
  })
}

export const deleteProject = ({ commit }, id) => {
  commit(types.DELETE_PROJECT, { id })
}
