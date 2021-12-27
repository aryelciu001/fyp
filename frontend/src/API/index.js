import axios from 'axios'
const API = process.env.REACT_APP_API

export default function api(action, payload = null) {
  switch (action) {
    case 'LOGIN':
      return login(payload)
    case 'GET_USER_INFO':
      return getUserInfo(payload)
    case 'GET_PROJECT_LIST':
      return getProjectList(payload)
    case 'POST_FYP':
      return postFyp(payload)
    case 'POST_FYP_MANY':
      return postFypMany(payload)
    case 'PUT_FYP':
      return putFyp(payload)
    case 'DELETE_FYP':
      return deleteFyp(payload)
    case 'POST_USER':
      return postUser(payload)
    case 'PUT_USER':
      return putUser(payload)
    case 'GET_USER':
      return getUser(payload)
    case 'DELETE_USER':
      return deleteUser(payload)
    default:
      return
  }
}

function login(payload) {
  const uri = `${API}/auth/login`
  const body = {
    email: payload.email,
    password: payload.password,
  }
  return axios.post(uri, body)
}

function getUserInfo(payload) {
  const uri = `${API}/auth/${payload.token}`
  return axios.get(uri)
}

function getProjectList(payload) {
  const uri = `${API}/project`
  const config = {
    headers: {
      Authorization: payload.token,
    },
  }
  return axios.get(uri, config)
}

function postFyp(payload) {
  const uri = `${API}/project`
  const {
    title,
    projno,
    summary,
    supervisor,
    email,
    token,
  } = payload
  const body = {
    title,
    projno,
    summary,
    supervisor,
    email,
  }
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.post(uri, body, config)
}

function postUser(payload) {
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

function getUser(payload) {
  const uri = `${API}/user`
  const config = {
    headers: {
      Authorization: payload.token,
    },
  }
  return axios.get(uri, config)
}

function putFyp(payload) {
  const uri = `${API}/project`
  const {
    title,
    projno,
    summary,
    supervisor,
    email,
    token,
  } = payload
  const body = {
    title,
    projno,
    summary,
    supervisor,
    email,
  }
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.put(uri, body, config)
}

function putUser(payload) {
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

function deleteFyp(payload) {
  const { id, token } = payload
  const uri = `${API}/project/${id}`
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.delete(uri, config)
}

function deleteUser(payload) {
  const { id, token } = payload
  const uri = `${API}/user/${id}`
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.delete(uri, config)
}

function postFypMany(payload) {
  const uri = `${API}/project/csv`
  const { formData, token } = payload
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.post(uri, formData, config)
}
