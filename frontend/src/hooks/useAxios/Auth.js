import axios from 'axios'
const API = process.env.REACT_APP_API

export function login(payload) {
  const uri = `${API}/auth/login`
  const body = {
    email: payload.email,
    password: payload.password,
  }
  return axios.post(uri, body)
}
