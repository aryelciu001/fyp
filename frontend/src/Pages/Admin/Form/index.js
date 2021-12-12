import React from 'react';
import AddFyp from './AddFyp';
import AddStudent from './AddStudent';
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
    case 'Add Student':
      return <AddStudent></AddStudent>
    default:
      return ''
  }
}