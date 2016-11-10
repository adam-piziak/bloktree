import router from '../router'
import axios from 'axios'
import { SERVER_URL } from '../lib/server/loc'

const API_URL = SERVER_URL
const LOGIN_URL = API_URL + '/authenticate'
const SIGNUP_URL = API_URL + '/signup'

export default {

  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    axios.post(LOGIN_URL, creds).then((res) => {
      if (!res.data.success) {
        console.log(res.data.message)
      } else {
        localStorage.setItem('id_token', res.data.id_token)
        this.user.authenticated = true
        router.push('/tasks')
      }
    })
  },

  signup (context, creds, redirect) {
    axios.post(SIGNUP_URL, creds, (res) => {
      localStorage.setItem('id_token', res.data.id_token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },

  logout () {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth () {
    let jwt = localStorage.getItem('id_token')
    if (jwt) {
      this.user.authenticated = true
      router.push('/tasks')
    } else {
      this.user.authenticated = false
      router.push('/authenticate')
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + localStorage.getItem('id_token')
    }
  }
}
