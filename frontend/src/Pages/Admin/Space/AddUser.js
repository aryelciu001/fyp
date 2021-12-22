import React from 'react'
import UserForm from 'Pages/Admin/Form/UserForm'

export default function AddUser () {
  return (
    <div className="form">
      <UserForm 
        formType="addUser"
        />
    </div>
  )
}