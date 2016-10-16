import * as types from './mutations-types'

export const createTask = ({ commit }, task) => {
  commit(types.CREATE_TASK, {
    task
  })
}
