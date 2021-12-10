import React from 'react';
import { TextField } from '@mui/material';

export default function TextArea (props) {
  return (
    <TextField
      id="outlined-multiline-static"
      label={props.title}
      multiline
      rows={4}
    />
  )
}