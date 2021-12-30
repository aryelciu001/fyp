import React from 'react'
import UserForm from 'Pages/Admin/Form/UserForm'
import FileInput from 'Pages/Admin/FileInput'

export default function AddUser() {
  return (
    <div className="form">
      <FileInput
        apiRequestType="POST_USER_MANY"
      />
      <UserForm
        formType="addUser"
      />
    </div>
  )
}
