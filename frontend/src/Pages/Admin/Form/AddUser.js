import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios';
const API = process.env.REACT_APP_API;
const roles = ['student', 'admin', 'supervisor']

export default function (props) {

  const [email, setEmail] = useState('')
  const [studentMatricNumber, setStudentMatricNumber] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')

  const submit = () => {

    if (!email) {
      alert('email is empty')
      return
    }
    if (!studentMatricNumber && role === 'student') {
      alert('Student matriculation number is empty!')
      return
    }
    if (!password) {
      alert('Password is empty!')
      return
    }
    if (!email.includes('@')) {
      alert('email does not look like email!')
      return
    }

    const url = `${API}/user`
    const req = {
      email,
      studentMatricNumber,
      password,
      role
    }
    axios.post(url, req)
      .then(() => {
        alert('Account Created!')
        setEmail('')
        setStudentMatricNumber('')
        setPassword('')
      })
      .catch((e) => {
        switch (e.response.data.code) {
          case 'ER_DUP_ENTRY':
            alert('Duplicate entry with the same matriculation number')
            break
          default:
            alert('Something is wrong')
        }
      })
  }

  return (
    <>
      {
        role === 'student' ? <div className='form-row'>
          <TextField 
            label='Student Matriculation Number'
            variant='outlined' 
            onChange={(e) => setStudentMatricNumber(e.target.value)}
            value={studentMatricNumber}
            />
        </div> : ''
      }
      <div className='form-row'>
        <TextField 
          label='Email'
          variant='outlined' 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          />
      </div>
      <div className='form-row'>
        <TextField 
          label='Password'
          variant='outlined' 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          />
      </div>
      <div className='form-row'>
        <FormControl fullWidth>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            label='Role'
            onChange={(e)=>setRole(e.target.value)}
          >
            {
              roles.map(role => <MenuItem key={role} value={role}>{role}</MenuItem>)
            }
          </Select>
        </FormControl>
      </div>
      <Button onClick={submit}>Add User</Button>
    </>
  )
}