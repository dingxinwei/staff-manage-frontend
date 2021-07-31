import axios from 'axios'
import {Message} from 'element-ui'
let http = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  transformRequest: [function (data) {
    let newData = ''
    for (let k in data) {
      if (data.hasOwnProperty(k) === true) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }]
})
http.interceptors.request.use(config => {
  if (localStorage.getItem('token')) {
    config.headers.token = localStorage.getItem('token')
  }
  return config
})
http.interceptors.response.use(res => {
  let code = res.data.code || 200
  if (code === 401) {
    Message({
      message: '登录状态已过期，即将跳转到登录页面',
      type: 'error'
    })
    setTimeout(() => {
      window.location.pathname = '/login'
      localStorage.clear()
    }, 1000)
  } else {
    return res
  }
})
function apiAxios (method, url, params, response) {
  http({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null
  }).then(function (res) {
    response(res)
  }).catch(function (err) {
    response(err)
  })
}

export default {
  get (url, params = null, response) {
    return apiAxios('GET', url, params, response)
  },
  post (url, params, response) {
    return apiAxios('POST', url, params, response)
  },
  put (url, params, response) {
    return apiAxios('PUT', url, params, response)
  },
  delete (url, params, response) {
    return apiAxios('DELETE', url, params, response)
  }
}
