import React from 'react'
import FileInput from 'Pages/Admin/FileInput'
import FypForm from 'Pages/Admin/Form/FypForm'

export default function AddFyp() {
  return (
    <div className="form">
      <FileInput></FileInput>
      <FypForm
        formType="addFyp"
      />
    </div>
  )
}
