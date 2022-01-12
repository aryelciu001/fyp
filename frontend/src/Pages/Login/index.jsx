import React, { useState } from 'react'
import { TextField, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from 'Reducers/user'
import { ApiRequestType } from 'utils/constant'
import './index.scss'
import useAxios from 'hooks/useAxios'

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const request = useAxios()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const loginLocal = () => {
    request(ApiRequestType.LOGIN, { email, password })
      .then((res) => {
        const user = res.data
        dispatch(login(user))
        navigate('/')
      })
      .catch((e) => {
        setError('Email or password is incorrect')
      })
  }

  return (
    <div className="login">
      <div className="form">
        <div className="row">
          <Typography>
            Login
          </Typography>
        </div>
        <div className="row">
          <TextField
            label="Email"
            variant="outlined"
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="row">
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <div className="row">
          <Button
            variant="contained"
            onClick={loginLocal}
          >
            Login
          </Button>
        </div>
        <div className="row">
          <span className="error">
            {error}
          </span>
        </div>
      </div>
    </div>
  )
}
