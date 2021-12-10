import React from 'react';
import './index.scss';
import { TextField } from '@mui/material';

export default function FormRow (props) {
  return (
    <div className="form-row">
      {
        inputSelector(props.type, props.title)
      }
    </div>
  )
}

function inputSelector (type, title) {
  switch (type) {
    case 'textarea':
      return <TextField
        label={title}
        multiline
        rows={4}
        />
    case 'textfield':
      return <TextField 
        label={title} 
        variant="outlined" 
        />
    case 'password':
      return <TextField 
        label={title} 
        variant="outlined" 
        type="password"
        />
    case 'email':
      return <TextField 
        label={title} 
        variant="outlined" 
        type="email"
        />
    default:
      return ""
  }
}