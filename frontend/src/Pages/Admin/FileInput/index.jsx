import React, { useRef } from 'react'
import { Button } from '@mui/material'
import api from 'API'
import { useSelector } from 'react-redux'
import './index.scss'

export default function FileInput(props) {
  const { apiRequestType } = props
  const fileInput = useRef(null)
  const token = useSelector((s) => s.user.token)

  const handleUpload = () => {
    // check if there is a file
    if (!fileInput.current.files.length) {
      alert('No file chosen!')
      return
    }

    const csvFile = fileInput.current.files[0]

    // check name
    if (!csvFile.name.includes('.csv')) {
      alert('Upload file only allows .csv file!')
      return
    }

    const formData = new FormData()
    formData.append(
      'csvFile',
      csvFile,
      csvFile.name,
    )

    api(apiRequestType, { formData, token })
      .then(() => alert('File Added!'))
  }

  return (
    <div className='file-input'>
      <Button
        variant='contained'
        onClick={handleUpload}
        >
        Upload CSV
      </Button>
      <input
        ref={fileInput}
        type='file'
        />
    </div>
  )
}
