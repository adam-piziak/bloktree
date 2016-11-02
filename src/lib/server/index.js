import Vue from 'vue'

const SERVER_URL = 'http://127.0.0.1:3000'

export const getTasks = (callback) => {
  const URL = SERVER_URL + '/task/getAll'
  const token = localStorage.getItem('id_token')
  const data = {
    token
  }

  Vue.http.post(URL, data).then((res) => {
    if (!res.body.success) {
      callback(res.body.error)
    } else {
      console.log(res.body.tasks)
      callback(null, res.body.tasks)
    }
  })
}

export const deleteTask = (id, callback) => {
  const URL = SERVER_URL + '/task/delete'
  const token = localStorage.getItem('id_token')
  const data = {
    token,
    taskId: id
  }

  Vue.http.post(URL, data).then((res) => {
    if (!res.body.success) {
      callback(res.body.error)
    } else {
      callback(null, true)
    }
  })
}

export const createProject = (project, callback) => {
  const URL = SERVER_URL + '/project/create'
  const token = localStorage.getItem('id_token')
  const data = { project, token }
  Vue.http.post(URL, data).then((res) => {
    if (!res.body.success) {
      callback(res.body.error)
    } else {
      callback(null, true)
    }
  })
}

export const getAllProjects = callback => {
  const URL = SERVER_URL + '/project/getAll'
  const token = localStorage.getItem('id_token')
  const data = { token }
  Vue.http.post(URL, data).then((res) => {
    if (!res.body.success) {
      callback(res.body.error)
    } else {
      callback(null, res.body.projects)
    }
  })
}
