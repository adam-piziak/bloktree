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
