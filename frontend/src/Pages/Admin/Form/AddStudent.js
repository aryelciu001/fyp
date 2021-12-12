import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';

export default function (props) {

  const [studentEmail, setStudentEmail] = useState('')
  const [studentMatricNumber, setStudentMatricNumber] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    console.log(password)
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