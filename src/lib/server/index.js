import axios from 'axios'

const SERVER_URL = 'http://127.0.0.1:3000'

const token = () => {
  return localStorage.getItem('id_token')
}

export const getTasks = (callback) => {
  const URL = SERVER_URL + '/task/getAll'
  const token = localStorage.getItem('id_token')
  const data = {
    token
  }

  axios.post(URL, data).then((res) => {
    if (!res.data.success) {
      callback(res.data.error)
    } else {
      callback(null, res.data.tasks)
    }
  }).catch((err) => {
    console.error(err)
  })
}

export const task = {
  create (unit, callback) {
    const URL = SERVER_URL + '/task/create'
    const data = { token: token(), unit }
    axios.post(URL, data).then((res) => {
      if (!res.data.success) {
        callback(res.data.error, false)
      } else {
        callback(null, true)
      }
    })
  },
  makeGroup (id, callback) {
    const URL = SERVER_URL + '/task/makeGroup'
    const data = {token: token(), id}
    axios.post(URL, data).then((res) => {
      if (!res.data.success) {
        callback(res.data.error)
      } else {
        callback(null, true)
      }
    }).catch((err) => {
      callback(err)
    })
  }
}

export const deleteTask = (id, callback) => {
  const URL = SERVER_URL + '/task/delete'
  const token = localStorage.getItem('id_token')
  const data = {
    token,
    taskId: id
  }

  axios.post(URL, data).then((res) => {
    if (!res.data.success) {
      callback(res.data.error)
    } else {
      callback(null, true)
    }
  }).catch((err) => {
    console.error(err)
  })
}

export const createProject = (project, callback) => {
  const URL = SERVER_URL + '/project/create'
  const token = localStorage.getItem('id_token')
  const data = { project, token }
  axios.post(URL, data).then((res) => {
    if (!res.body.success) {
      callback(res.body.error)
    } else {
      callback(null, true)
    }
  }).catch((err) => {
    console.error(err)
  })
}

export const getAllProjects = callback => {
  const URL = SERVER_URL + '/project/getAll'
  const token = localStorage.getItem('id_token')
  const data = { token }
  axios.post(URL, data).then((res) => {
    if (!res.data.success) {
      callback(res.data.error)
    } else {
      callback(null, res.data.projects)
    }
  })
}
