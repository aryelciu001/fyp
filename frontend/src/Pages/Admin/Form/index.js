import React from 'react';
import FormRow from '../FormRow';
import Button from '@mui/material/Button';
import './index.scss';

const infoArrays = [
  {
    title: "Project Title",
    type: "textfield"
  },
  {
    title: "Project ID",
    type: "textfield"
  },
  {
    title: "Project Information",
    type: "textarea"
  },
  {
    title: "Supervisor Name",
    type: "textfield"
  },
  {
    title: "Supervisor ID",
    type: "textfield"
  },
]

export default function Form (props) {
  return (
    <div className="form">
      {
        infoArrays.map(info => (
          <FormRow type={info.type} title={info.title}/>
        ))
      }
      <Button>Add FYP</Button>
    </div>
  )
}