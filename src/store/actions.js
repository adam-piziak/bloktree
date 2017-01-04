import * as types from './mutations-types'
import * as server from '../lib/server/index'

export const createTask = ({ commit }, taskData) => {
  let task = {
    name: taskData.name,
    parent: taskData.parent,
    project: taskData.project,
    mode: taskData.mode,
    priority: taskData.priority
  }
  server.task.create(task, (err) => {
    if (err) {
      console.error(err)
    } else {
      commit(types.CREATE_TASK, { task })
    }
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
  server.task.edit(edit, (err) => {
    if (!err) {
      commit(types.EDIT_TASK, { edit })
    } else {
      console.error('ERROR:' + err)
    }
  })
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
  server.task.makeGroup(id, (err, success) => {
    if (err) {
      console.error(err)
    } else {
      commit(types.MAKE_GROUP, { id })
    }
  })
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

export const setAllProjects = ({ commit }) => {
  server.getAllProjects((err, projects) => {
    if (err) {
      console.error(err)
    } else {
      commit(types.SET_ALL_PROJECTS, projects)
    }
  })
}
