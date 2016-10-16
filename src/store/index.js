import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import tasks from './modules/tasks'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    tasks
  }
})
