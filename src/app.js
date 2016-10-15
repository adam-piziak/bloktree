// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
