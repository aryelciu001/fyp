import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import { TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import api from 'API'
import { useSelector } from 'react-redux'
import './index.scss'
const roles = ['Student', 'Admin', 'Supervisor']

export default function AddUser (props) {

  const [email, setEmail] = useState('')
  const [studentMatricNumber, setStudentMatricNumber] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Student')
  const [apiRequestType, setApiRequestType] = useState('')
  const [apiResponseString, setApiResponseString] = useState('')
  const [buttonString, setButtonString] = useState('')
  const token = useSelector(s => s.user.token)
  const { formType } = props

  useEffect(() => {
    switch(formType) {
      case 'addUser':
        setApiRequestType('POST_USER')
        setApiResponseString('User Created!')
        setButtonString("Add User")
        break
      case 'addFyp':
        setApiRequestType('PUT_USER')
        setApiResponseString('User Edited!')
        setButtonString("Edit User")
        break
      default: 
        return
    }
  }, [formType])

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
    api(apiRequestType, payload)
      .then(() => {
        alert(apiResponseString)
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
    <div className="form-content">
      {
        role === 'Student' ? <div className='form-content-row'>
          <TextField 
            label='Student Matriculation Number'
            variant='outlined' 
            onChange={(e) => setStudentMatricNumber(e.target.value)}
            value={studentMatricNumber}
            />
        </div> : ''
      }
      <div className='form-content-row'>
        <TextField 
          label='Email'
          variant='outlined' 
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          />
      </div>
      <div className='form-content-row'>
        <TextField 
          label='Password'
          variant='outlined' 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          />
      </div>
      <div className='form-content-row'>
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
      <Button onClick={submit}>{ buttonString }</Button>
    </div>
  )
}