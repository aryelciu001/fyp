import React, { useState } from 'react'
import { TextField, Typography, Button } from '@mui/material'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'
import api from 'API'
import { login } from 'Reducers/user'
import './index.scss'

export default function Login(props) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const loginLocal = () => {
    api('LOGIN', { email, password })
      .then((res) => {
        let user = res.data
        dispatch(login(user))
        navigate("/")
      })
      .catch(e => {
        switch(e.response.status){
          case 401: 
            setError("Email or password is incorrect")
            break
          default:
            setError("Something is wrong")
            break
        }
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