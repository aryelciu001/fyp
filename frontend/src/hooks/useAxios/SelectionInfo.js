import axios from 'axios'
const API = process.env.REACT_APP_API

export function openSelection(payload) {
  const uri = `${API}/selectioninfo`
  const {
    time,
    token,
  } = payload
  const body = {
    time,
  }
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.post(uri, body, config)
}
