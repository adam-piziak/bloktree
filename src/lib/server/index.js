import axios from 'axios'
import { SERVER_URL } from './loc'

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

export const user = {
  check (username, callback) {
    const URL = SERVER_URL + '/user/check'
    const data = { username }
    axios.post(URL, data).then((res) => {
      if (!res.data.success && res.data.err) {
        callback(true, null)
      } else if (!res.data.success && !res.data.err) {
        callback(null, false)
      } else if (res.data.success) {
        callback(null, true)
      } else {
        callback(true, null)
      }
    })
  }
}

export const task = {
  create (unit, callback) {
    const URL = SERVER_URL + '/task/create'
    const data = { token: token(), unit }
    axios.post(URL, data).then((res) => {
      console.log(res.data)
      if (!res.data.success) {
        callback(res.data.error, false)
      } else {
        callback(null, true)
      }
    })
  },

  edit (edit, callback) {
    const URL = SERVER_URL + '/task/edit'
    const data = { token: token(), edit }
    console.log(edit)
    console.log(!edit.name || !edit.parent || !edit.project || !edit.mode || !edit.priority)
    axios.post(URL, data).then((res) => {
      if (res.data.error) {
        console.error('ERROR: ' + res.data.error)
        callback(res.data.error)
      } else {
        callback(null)
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
