import React from 'react';
import AddFyp from './AddFyp';
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
      // return studentFields.map(info => (
      //     <FormRow key={info.title} type={info.type} title={info.title}/>
      //   )
      // )
    default:
      return ''
  }
}

// studentFields: [
//   {
//     title: "Student Email",
//     type: "email"
//   },
//   {
//     title: "Student Matriculation Number",
//     type: "textfield"
//   },
//   {
//     title: "Password",
//     type: "password"
//   },
// ]