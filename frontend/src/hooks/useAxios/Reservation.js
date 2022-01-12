import axios from 'axios'
const API = process.env.REACT_APP_API

export function postReservation(payload) {
  const uri = `${API}/reservation`
  const {
    email,
    projno,
    token,
  } = payload
  const body = {
    email,
    projno,
  }
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.post(uri, body, config)
}

export function deleteReservation(payload) {
  const { email, projno, token } = payload
  const uri = `${API}/reservation/${email}&${projno}`
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.delete(uri, config)
}

export function getReservation(payload) {
  const { token } = payload
  const uri = `${API}/reservation`
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.get(uri, config)
}
