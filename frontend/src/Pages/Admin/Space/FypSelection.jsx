import React, { useState } from 'react'
import { Button } from '@mui/material'
import DateTimePicker from 'Components/DateTimePicker'

export default function FypSelection() {
  const [value, setValue] = useState(new Date())

  const openSelection = () => {
    console.log(value.getTime())
  }

  const closeSelection = () => {
    console.log(value.getTime())
  }

  return (
    <div className='space-content'>
      <div className='selection-time-buttons'>
        <Button
          className='btn-primary'
          variant="contained"
          onClick={openSelection}
        >
          Open Selection
        </Button>
        <Button
          className='btn-danger'
          variant="contained"
          onClick={closeSelection}
        >
          Close Selection
        </Button>
      </div>
      <div className='datetimepicker'>
        <DateTimePicker
          value={value}
          setValue={setValue}
          label='Date & time to open selection'
        />
      </div>
    </div>
  )
}
