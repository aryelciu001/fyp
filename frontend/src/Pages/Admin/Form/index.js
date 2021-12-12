import React from 'react';
import AddFyp from './AddFyp';
import AddUser from './AddUser';
import './index.scss';

export default function Form (props) {
  return (
    <div className="form">
      {
        formSelector(props.option)
      }
    </div>
  )
}

function formSelector (option) {
  switch (option) {
    case 'Add FYP':
      return <AddFyp></AddFyp>
    case 'Add User':
      return <AddUser></AddUser>
    default:
      return ''
  }
}