import React, { useState, useEffect } from 'react'
import ProjectList from './ProjectList'
import { useDispatch } from 'react-redux'
import { ApiRequestType } from 'utils/constant'
import { updateReservation } from 'Reducers/reservation'
import axios from 'axios'
import useAxios from 'hooks/useAxios'

export default function Reservation() {
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
      <ProjectList
        update={update}
      />
    </React.Fragment>
  )
}
