import React, { useState } from 'react'
import { Button } from '@mui/material'
import DateTimePicker from 'Components/DateTimePicker'
import useAxios from 'hooks/useAxios'
import { ApiRequestType } from 'utils/constant'

export default function FypSelection() {
  const [value, setValue] = useState(new Date())
  const request = useAxios()

  const openSelection = () => {
    request(ApiRequestType.OPEN_SELECTION, { time: value.getTime() })
      .then(() => alert(`Selection is to be opened on ${value}`))
      .catch(() => alert('something is wrong'))
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
