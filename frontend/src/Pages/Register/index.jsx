import React, { useState } from 'react'
import { TextField, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ApiRequestType } from 'utils/constant'
import './index.scss'
import useAxios from 'hooks/useAxios'

export default function Login() {
  const navigate = useNavigate()
  const request = useAxios()

  const [email, setEmail] = useState('')
  const [studentMatricNumber, setStudentMatricNumber] = useState('')
  const [password, setPassword] = useState('')

  const register = () => {
    if (!email) {
      alert('email is empty')
      return
    }
    if (!studentMatricNumber) {
      alert('Matriculation number is empty')
      return
    }
    if (!password) {
      alert('password is empty')
      return
    }
    request(ApiRequestType.REGISTER, { email, password, studentMatricNumber })
      .then(() => {
        alert('Registration successful. Please login.')
        navigate('/login')
      })
      .catch((e) => {
        switch (e.response.data.statusCode) {
          case 409:
            alert('Duplicate record with the same email')
            break
          default:
            alert('Something is wrong')
        }
      })
  }

  return (
    <div className="login">
      <div className="form">
        <div className="row">
          <Typography>
            Register
          </Typography>
        </div>
        <div className="row">
          <TextField
            value={email}
            label="Email"
            variant="outlined"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="row">
          <TextField
            value={studentMatricNumber}
            label="Matriculation Number"
            variant="outlined"
            onChange={(e)=>setStudentMatricNumber(e.target.value)}
          />
        </div>
        <div className="row">
          <TextField
            value={password}
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="row">
          <Button
            variant="contained"
            onClick={register}
          >
            Register
          </Button>
        </div>
      </div>
    </div>
  )
}
