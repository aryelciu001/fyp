import { useRef } from 'react'
import { Button } from '@mui/material'
import './index.scss'

export default function FileInput() {

  const fileInput = useRef(null)

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