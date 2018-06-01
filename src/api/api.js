import axios from 'axios'

let base = 'http://localhost:8081/static/data/'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
export const requestLogin = params => {
  return axios.post(`${base}/login`, params).then(res => res.data)
}
/*          用户操作       */
export const getUserList = params => {
  return axios.get(`${base}/user/list`, { params: params })
}

export const getUserListPage = params => {
  return axios.get(`${base}/user/listpage`, { params: params })
}

export const removeUser = params => {
  return axios.get(`${base}/user/remove`, { params: params })
}

export const editUser = params => {
  return axios.get(`${base}/user/edit`, { params: params })
}

export const addUser = params => {
  return axios.get(`${base}/user/add`, { params: params })
}

/*        省份操作         */
export const getProvince = () => {
  return axios.get(`${base}/province.json`).then(res => res.data)
  // return axios.get(`${base}/user/add`)
}
export const addProvince = params => {
  return axios.get(`${base}/user/add`, { params: params })
}
export const delProvince = params => {
  return axios.get(`${base}/user/add`, { params: params })
}
export const editProvince = params => {
  return axios.get(`${base}/user/add`, { params: params })
}

/*           城市操作               */
export const getCity = params => {
  return axios.get(`${base}/city.json`, { params: params }).then(res => res.data)
}

