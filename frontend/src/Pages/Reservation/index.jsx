import React, { useState, useEffect } from 'react'
import ProjectList from './ProjectList'
import { useDispatch, useSelector } from 'react-redux'
import { ApiRequestType } from 'utils/constant'
import { updateReservation } from 'Reducers/reservation'
import axios from 'axios'
import useAxios from 'hooks/useAxios'
import { updateSelection } from 'Reducers/selection'

export default function Reservation() {
  const reservation = useSelector((state) => state.reservation.list)
  const selection = useSelector((state) => state.selection.list)
  const request = useAxios()
  const [unmounted, setUnmounted] = useState(false)
  const [selectionOpenInfo, setSelectionOpenInfo] = useState('Selection is closed')
  const [selectionCloseInfo, setSelectionCloseInfo] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    const source = axios.CancelToken.source()
    update()
    return function() {
      setUnmounted(true)
      source.cancel('Cancelling in cleanup')
    }
  }, [])

  const update = () => {
    request(ApiRequestType.GET_RESERVATION)
      .then((res) => {
        if (unmounted) return
        dispatch(updateReservation({ reservation: res.data }))
      })
    request(ApiRequestType.GET_SELECTION)
      .then((res) => {
        if (unmounted) return
        dispatch(updateSelection({ selection: res.data }))
      })
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

  return (
    <React.Fragment>
      <h3 style={{ marginBottom: '30px' }}>{ selectionOpenInfo }</h3>
      <h3 style={{ marginBottom: '30px' }}>{ selectionCloseInfo }</h3>
      <h1>Your Selection</h1>
      <ProjectList
        type='selection'
        list={selection}
      />
      <h1>Your Reservations</h1>
      <ProjectList
        list={reservation}
        update={update}
        type='reservation'
      />
    </React.Fragment>
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
