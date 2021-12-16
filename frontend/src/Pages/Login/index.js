import React, { useState, useEffect } from 'react';
import { TextField, Typography, Button } from '@mui/material';
import axios from 'axios';
import './index.scss';

const API = process.env.REACT_APP_API;

export default function Login(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(()=>{
    if (error) setError('')
  }, [email, password])

  const login = () => {
    let uri = `${API}/auth/login`
    axios.post(uri, {
      email, 
      password
    }).then(res => {
      let token = res.data.token
      props.saveToken(token)
    }).catch(e => {
      console.log(e)
      switch (e.response.status) {
        case (401):
          setError("Email or password is incorrect")
          break
        case (500):
          setError("Server fault")
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
            onClick={login}
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