import axios from 'axios'
const API = process.env.REACT_APP_API

export function getUserInfo(payload) {
  const uri = `${API}/auth/${payload.token}`
  return axios.get(uri)
}

export function postUser(payload) {
  const uri = `${API}/user`
  const {
    email,
    studentMatricNumber,
    password,
    role,
    token,
  } = payload
  const body = {
    email,
    studentMatricNumber,
    password,
    role,
  }
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.post(uri, body, config)
}

export function getUser(payload) {
  const uri = `${API}/user`
  const config = {
    headers: {
      Authorization: payload.token,
    },
  }
  return axios.get(uri, config)
}

export function putUser(payload) {
  const uri = `${API}/user`
  const {
    email,
    studentMatricNumber,
    password,
    role,
    token,
  } = payload
  const body = {
    email,
    studentMatricNumber,
    password,
    role,
  }
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.put(uri, body, config)
}

export function deleteUser(payload) {
  const { id, token } = payload
  const uri = `${API}/user/${id}`
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.delete(uri, config)
}

export function postUserMany(payload) {
  const uri = `${API}/user/csv`
  const { formData, token } = payload
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.post(uri, formData, config)
}
