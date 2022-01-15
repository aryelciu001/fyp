import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import DateTimePicker from 'Components/DateTimePicker'
import useAxios from 'hooks/useAxios'
import { ApiRequestType } from 'utils/constant'
import axios from 'axios'

export default function FypSelection() {
  const [value, setValue] = useState(new Date())
  const [unmounted, setUnmounted] = useState(false)
  const [selectionInfo, setSelectionInfo] = useState('Selection is closed')
  const request = useAxios()

  useEffect(() => {
    update()
    const source = axios.CancelToken.source()
    return function() {
      setUnmounted(true)
      source.cancel('Cancelling in cleanup')
    }
  }, [])

  const update = () => {
    request(ApiRequestType.GET_SELECTION_INFO)
      .then((res) => {
        if (unmounted) return
        if (res.data.selectionopen) {
          let selectionOpenTime = res.data.selectionopentime
          selectionOpenTime = new Date(selectionOpenTime)
          selectionOpenTime = selectionOpenTime.toLocaleString()
          setSelectionInfo(`Selection is open on: ${selectionOpenTime}`)
        } else {
          setSelectionInfo('Selection is closed')
        }
      })
  }

  const openSelection = () => {
    request(ApiRequestType.UPDATE_SELECTION_INFO, { time: value.getTime(), open: 1 })
      .then(() => {
        alert(`Selection is to be opened on ${value}`)
        update()
      })
      .catch(() => alert('something is wrong'))
  }

  const closeSelection = () => {
    request(ApiRequestType.UPDATE_SELECTION_INFO, { time: 0, open: 0 })
      .then(() => {
        alert('Selection is closed')
        update()
      })
      .catch(() => alert('something is wrong'))
  }

  return (
    <div className='space-content'>
      <div>{ selectionInfo }</div>
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
