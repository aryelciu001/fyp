import React, { useState, useEffect } from 'react'
import ProjectList from './ProjectList'
import { useDispatch, useSelector } from 'react-redux'
import { ApiRequestType } from 'utils/constant'
import { updateReservation } from 'Reducers/reservation'
import axios from 'axios'
import useAxios from 'hooks/useAxios'

export default function Reservation() {
  const reservation = useSelector((state) => state.reservation.list)
  const selection = useSelector((state) => state.selection.list)
  const request = useAxios()
  const [unmounted, setUnmounted] = useState(false)
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
  }

  return (
    <React.Fragment>
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
