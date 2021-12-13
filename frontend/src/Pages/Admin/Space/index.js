import React from 'react';
import Table from '../Table';
import AddFyp from './AddFyp';
import AddUser from './AddUser';
import EditFyp from './EditFyp';
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
      return <AddFyp></AddFyp>
    case 'Edit FYP':
      return <EditFyp></EditFyp>
    case 'Add User':
      return <AddUser></AddUser>
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