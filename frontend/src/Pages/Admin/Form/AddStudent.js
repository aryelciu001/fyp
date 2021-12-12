import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';
const API = process.env.REACT_APP_API;

export default function (props) {

  const [studentEmail, setStudentEmail] = useState('')
  const [studentMatricNumber, setStudentMatricNumber] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {

    if (!studentEmail) {
      alert("Student email is empty")
      return
    }
    if (!studentMatricNumber) {
      alert("Student matriculation number is empty!")
      return
    }
    if (!password) {
      alert("Password is empty!")
      return
    }
    if (!studentEmail.includes("@")) {
      alert("Student email does not look like email!")
      return
    }

    const url = `${API}/student` 
    const req = {
      studentEmail,
      studentMatricNumber,
      password,
    }
    axios.post(url, req)
      .then(() => {
        alert('Student Account Created!')
        setStudentEmail('')
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
      <div className="form-row">
        <TextField 
          label="Student Matriculation Number"
          variant="outlined" 
          onChange={(e) => setStudentMatricNumber(e.target.value)}
          value={studentMatricNumber}
          />
      </div>
      <div className="form-row">
        <TextField 
          label="Student Email"
          variant="outlined" 
          onChange={(e) => setStudentEmail(e.target.value)}
          value={studentEmail}
          type="email"
          />
      </div>
      <div className="form-row">
        <TextField 
          label="Student Password"
          variant="outlined" 
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          />
      </div>
      <Button onClick={submit}>Add Student</Button>
    </>
  )
}