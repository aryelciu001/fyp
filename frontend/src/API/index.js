import axios from 'axios'
const API = process.env.REACT_APP_API

export default function (action, payload = null) {
  switch(action) {
    case 'LOGIN': 
      return login(payload)
    case 'GET_USER_INFO':
      return getUserInfo(payload)
    case 'GET_PROJECT_LIST':
      return getProjectList(payload)
    case 'POST_FYP':
      return postFyp(payload)
    case 'POST_USER':
      return postUser(payload)
    case 'GET_USER':
      return getUser(payload)
  }
}

function login (payload) {
  const uri = `${API}/auth/login`
  const body = { 
    email: payload.email, 
    password: payload.password 
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
      Authorization: payload.token
    }
  }
  return axios.get(uri, config)
}

function postFyp(payload) {
  const uri = `${API}/project`
  const {
    projectTitle,
    projectId,
    projectInfo,
    supervisorName,
    supervisorId,
    token
  } = payload
  const body = {
    projectTitle,
    projectId,
    projectInfo,
    supervisorName,
    supervisorId,
  }
  const config = {
    headers: {
      Authorization: token
    }
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
    token
  } = payload
  const body = {
    email,
    studentMatricNumber,
    password,
    role
  }
  const config = {
    headers: {
      Authorization: token
    }
  }
  return axios.post(uri, body, config)
}

function getUser(payload) {
  const uri = `${API}/user`
  const config = {
    headers: {
      Authorization: payload.token
    }
  }
  return axios.get(uri, config)
}