import axios from 'axios'
const API = process.env.REACT_APP_API

export function getProjectList(payload) {
  const uri = `${API}/project`
  const config = {
    headers: {
      Authorization: payload.token,
    },
  }
  return axios.get(uri, config)
}

export function postFyp(payload) {
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

export function putFyp(payload) {
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

export function deleteFyp(payload) {
  const { id, token } = payload
  const uri = `${API}/project/${id}`
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.delete(uri, config)
}

export function postFypMany(payload) {
  const uri = `${API}/project/csv`
  const { formData, token } = payload
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.post(uri, formData, config)
}
