import axios from 'axios'
import { useSelector } from 'react-redux'
const API = process.env.REACT_APP_API

export default function (action, payload = null) {
  let uri
  switch(action) {
    case 'LOGIN': 
      uri = `${API}/auth/login`
      return axios.post(uri, { email: payload.email, password: payload.password })
    case 'GET_USER_INFO':
      uri = `${API}/auth/${payload.token}`
      return axios.get(uri)
    case 'GET_PROJECT_LIST':
      uri = `${API}/project`
      return axios.get(uri, {
        headers: {
          Authorization: payload.token
        }
      })
  }
}

// axios.post(uri, {
//   email, 
//   password
// }).then(res => {
//   let token = res.data.token
//   axios.get(`${API}/auth/${token}`)
//     .then((res) => {
//       state.email = res.data.email
//       state.role = res.data.role
//       state.token = token
//       localStorage.setItem("token", token)
//     })
//     .catch(() => {
//       state = { email: "", role: "", token: "" }
//     })
// }).catch(e => {
//   switch (e.response.status) {
//     case (401):
//       dispatch(setError("Email or password is incorrect"))
//       break
//     case (500):
//       dispatch(setError("Server fault"))
//       break
//     default:
//       dispatch(setError("Something is wrong"))
//       break
//   }
// })
//     })
// }