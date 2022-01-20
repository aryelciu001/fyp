import axios from 'axios'
const API = process.env.REACT_APP_API

export function updateSelectionInfo(payload) {
  const uri = `${API}/selectioninfo`
  const {
    opentime,
    closetime,
    open,
    token,
  } = payload
  const body = {
    opentime,
    closetime,
    open,
  }
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.post(uri, body, config)
}

export function getSelectionInfo(payload) {
  const uri = `${API}/selectioninfo`
  const { token } = payload
  const config = {
    headers: {
      Authorization: token,
    },
  }
  return axios.get(uri, config)
}
