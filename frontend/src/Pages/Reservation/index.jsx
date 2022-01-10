// import ProjectList from 'Pages/Reservation/ProjectList'
import React, { useState, useEffect } from 'react'
import api from 'API'
import { useSelector } from 'react-redux'
import { ApiRequestType } from 'utils/constant'
import axios from 'axios'

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
      Your Reservations
      <ul>
        {
          reservation.map((r) => {
            return <li key={r.projno}>{r.projno}</li>
          })
        }
      </ul>
      {/* <ProjectList reservation={reservation}></ProjectList> */}
    </React.Fragment>
  )
}
