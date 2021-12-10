import React from 'react';
import FormRow from '../FormRow';
import Button from '@mui/material/Button';
import './index.scss';

const fypFields = [
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

const studentFields = [
  {
    title: "Student Email",
    type: "email"
  },
  {
    title: "Student Matriculation Number",
    type: "textfield"
  },
  {
    title: "Password",
    type: "password"
  },
]

export default function Form (props) {
  return (
    <div className="form">
      {
        formSelector(props.option)
      }
      <Button>{props.option}</Button>
    </div>
  )
}

function formSelector (option) {
  switch (option) {
    case 'Add FYP':
      return fypFields.map(info => (
          <FormRow key={info.title} type={info.type} title={info.title}/>
        )
      )
    case 'Add Student':
      return studentFields.map(info => (
          <FormRow key={info.title} type={info.type} title={info.title}/>
        )
      )
    default:
      return ''
  }
}