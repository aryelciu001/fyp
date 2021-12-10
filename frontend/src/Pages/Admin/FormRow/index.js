import React from 'react';
import './index.scss';
import TextArea from './TextArea';
import TextField from './TextField';

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
      return <TextArea title={title}></TextArea>
    case 'textfield':
      return <TextField title={title}></TextField>
    default:
      return ""
  }
}