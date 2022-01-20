import React, { useState, useEffect } from 'react'
import { Button } from '@mui/material'
import DateTimePicker from 'Components/DateTimePicker'
import useAxios from 'hooks/useAxios'
import { ApiRequestType } from 'utils/constant'
import axios from 'axios'

export default function FypSelection() {
  const [opentime, setOpentime] = useState(new Date())
  const [closetime, setClosetime] = useState(new Date())
  const [unmounted, setUnmounted] = useState(false)
  const [selectionOpenInfo, setSelectionOpenInfo] = useState('Selection is closed')
  const [selectionCloseInfo, setSelectionCloseInfo] = useState('')
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
          setSelectionOpenInfo(genSelectionInfo('open', res.data.selectionopentime))
          setSelectionCloseInfo(genSelectionInfo('close', res.data.selectionclosetime))
        } else {
          setSelectionOpenInfo('Selection is closed')
          setSelectionCloseInfo('')
        }
      })
  }

  const openSelection = () => {
    const opentimeInt = opentime.getTime()
    const closetimeInt = closetime.getTime()
    if (opentimeInt > closetimeInt) {
      alert('Closing time cannot be before opening time.')
      return
    }
    request(ApiRequestType.UPDATE_SELECTION_INFO, { opentime: opentimeInt, closetime: closetimeInt, open: 1 })
      .then(() => {
        alert(`Selection is to be opened on ${opentime}\nand to be closed on ${closetime}`)
        update()
      })
      .catch((e) => console.log(e) && alert('something is wrong'))
  }

  const closeSelection = () => {
    request(ApiRequestType.UPDATE_SELECTION_INFO, { opentime: 0, closetime: 0, open: 0 })
      .then(() => {
        alert('Selection is closed')
        update()
      })
      .catch(() => alert('something is wrong'))
  }

  return (
    <div className='space-content'>
      <p>{ selectionOpenInfo }</p>
      <p>{ selectionCloseInfo }</p>
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
          value={opentime}
          setValue={setOpentime}
          label='Date & time to open selection'
        />
      </div>
      <div className='datetimepicker'>
        <DateTimePicker
          value={closetime}
          setValue={setClosetime}
          label='Date & time to close selection'
        />
      </div>
    </div>
  )
}

function genSelectionInfo(type, time) {
  time = new Date(time)
  time = time.toLocaleString()
  switch (type) {
    case 'open':
      return `Selection is open on: ${time}`
    case 'close':
      return `Selection is closed on: ${time}`
    default:
      return ''
  }
}
