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
  const [selectionInfo, setSelectionInfo] = useState('Selection is closed')
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
          let selectionOpenTime = res.data.selectionopentime
          selectionOpenTime = new Date(selectionOpenTime)
          selectionOpenTime = selectionOpenTime.toLocaleString()
          setSelectionInfo(`Selection is open on: ${selectionOpenTime}`)
        } else {
          setSelectionInfo('Selection is closed')
        }
      })
  }

  return (
    <React.Fragment>
      <h3 style={{ marginBottom: '30px' }}>{ selectionInfo }</h3>
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
