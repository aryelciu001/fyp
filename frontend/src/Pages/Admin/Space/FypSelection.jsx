import React, { useState } from 'react'
import { Button } from '@mui/material'
import DateTimePicker from 'Components/DateTimePicker'
import useAxios from 'hooks/useAxios'
import { ApiRequestType } from 'utils/constant'

export default function FypSelection() {
  const [value, setValue] = useState(new Date())
  const request = useAxios()

  const openSelection = () => {
    request(ApiRequestType.UPDATE_SELECTION, { time: value.getTime(), open: 1 })
      .then(() => alert(`Selection is to be opened on ${value}`))
      .catch(() => alert('something is wrong'))
  }

  const closeSelection = () => {
    request(ApiRequestType.UPDATE_SELECTION, { time: 0, open: 0 })
      .then(() => alert('Selection is closed'))
      .catch(() => alert('something is wrong'))
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
