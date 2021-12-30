import React from 'react'
import FileInput from 'Pages/Admin/FileInput'
import FypForm from 'Pages/Admin/Form/FypForm'

export default function AddFyp() {
  return (
    <div className="form">
      <FileInput
        apiRequestType="POST_FYP_MANY"
      />
      <FypForm
        formType="addFyp"
      />
    </div>
  )
}
