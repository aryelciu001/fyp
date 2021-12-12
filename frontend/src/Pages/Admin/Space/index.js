import React from 'react';
import Form from '../Form';
import './index.scss';

export default function Space(props) {
  return (
    <div className="space">
      <h3>{props.selectedOption}</h3>
      {
        spaceGenerator(props.selectedOption)
      }
    </div>
  )
}

function spaceGenerator (option) {
  switch (option) {
    case 'Add FYP':
      return <Form option={option}></Form>
    case 'Edit FYP':
      return ""
    case 'Add User':
      return <Form option={option}></Form>
    case 'Edit User':
      return ""
    case 'View Reservations':
      return ""
    case 'Generate Report':
      return ""
    default:
      return ''
  }
}