import axios from 'axios'
const API = process.env.REACT_APP_API

export function select(payload) {
  const uri = `${API}/selection`
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

