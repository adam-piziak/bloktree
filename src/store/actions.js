import * as types from './mutations-types'

export const createTask = ({ commit }, task) => {
  commit(types.CREATE_TASK, { task })
}

export const deleteTask = ({ commit }, id) => {
  commit(types.DELETE_TASK, { id })
}

export const createProject = ({ commit }, project) => {
  commit(types.CREATE_PROJECT, { project })
}

export const deleteProject = ({ commit }, id) => {
  commit(types.DELETE_PROJECT, { id })
}
