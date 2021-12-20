import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import api from '../../../API'
import { useSelector } from 'react-redux';
const roles = ['Student', 'Admin', 'Supervisor']

export default function () {

  const [email, setEmail] = useState('')
  const [studentMatricNumber, setStudentMatricNumber] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Student')
  const token = useSelector(s => s.user.token)

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

    const payload = {
      email,
      studentMatricNumber,
      password,
      role: role.toLowerCase(),
      token
    }
    api('POST_USER', payload)
      .then(() => {
        alert('Account Created!')
        setEmail('')
        setStudentMatricNumber('')
        setPassword('')
      })
      .catch((e) => {
        switch (e.response.data.code) {
          case 'ER_DUP_ENTRY':
            alert('Duplicate entry with the same email')
            break
          default:
            alert('Something is wrong')
        }
      })
  }

  return (
    <div className="form">
      {
        role === 'Student' ? <div className='form-row'>
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
    </div>
  )
}