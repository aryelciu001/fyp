import React, { useState, useEffect } from 'react'
import api from 'API'
import { useSelector } from 'react-redux'
import { ApiRequestType } from 'utils/constant'
import axios from 'axios'
import ProjectList from './ProjectList'

export default function Reservation() {
  const [reservation, setReservation] = useState([])
  const token = useSelector((state) => state.user.token)

  useEffect(() => {
    let unmounted = false
    const source = axios.CancelToken.source()
    api(ApiRequestType.GET_RESERVATION, { token })
      .then((res) => {
        if (unmounted) return
        setReservation(res.data)
      })
    return function() {
      unmounted = true
      source.cancel('Cancelling in cleanup')
    }
  }, [token])

  return (
    <React.Fragment>
      <ProjectList projectList={reservation}></ProjectList>
    </React.Fragment>
  )
}
