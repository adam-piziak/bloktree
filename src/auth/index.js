import router from '../router'

const API_URL = 'http://127.0.0.1:3000'
const LOGIN_URL = API_URL + '/authenticate'
const SIGNUP_URL = API_URL + '/signup'

export default {

  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    console.log('Logging in')
    context.$http.post(LOGIN_URL, creds).then((data) => {
      localStorage.setItem('id_token', data.body.id_token)
      this.user.authenticated = true
      router.push('/tasks')
    })
  },

  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)

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
