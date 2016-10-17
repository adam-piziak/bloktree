import * as types from './mutations-types'

export const createTask = ({ commit }, task) => {
  commit(types.CREATE_TASK, { task })
}

export const deleteTask = ({ commit }, id) => {
  console.log(id)
  commit(types.DELETE_TASK, { id })
}
