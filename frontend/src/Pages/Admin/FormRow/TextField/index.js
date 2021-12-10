import React from 'react';
import { TextField } from '@mui/material';

export default function (props) {
  return (
    <TextField id="outlined-basic" label={props.title} variant="outlined" />
  )
}