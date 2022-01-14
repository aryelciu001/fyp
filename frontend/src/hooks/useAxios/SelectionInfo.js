import axios from 'axios'
const API = process.env.REACT_APP_API

export function updateSelectionInfo(payload) {
  const uri = `${API}/selectioninfo`
  const {
    time,
    open,
    token,
  } = payload
  const body = {
    time,
    open,
  }
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.post(uri, body, config)
}
