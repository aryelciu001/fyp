/* eslint-disable */

import React from 'react'
import { Button } from '@mui/material'
import useAxios from 'hooks/useAxios'
import { ApiRequestType } from 'utils/constant'
import './index.scss'

export default function GenerateReport() {
  const request = useAxios()

  const generateReservationReport = () => {
    request(ApiRequestType.GET_ALL_RESERVATION)
      .then(res => console.log(res))
      .catch(() => alert('something is wrong'))
  }

  const generateSelectionReport = () => {
    request(ApiRequestType.GET_ALL_SELECTION)
      .then(res => console.log(res))
      .catch(() => alert('something is wrong'))
  }

  return (
    <div className='space-content'>
      <div className='generate-report-buttons'>
        <Button
          className='btn-primary'
          variant="contained"
          onClick={generateReservationReport}
        >
          Generate Reservation Report
        </Button>
        <Button
          className='btn-primary'
          variant="contained"
          onClick={generateSelectionReport}
        >
          Generate Selection Report
        </Button>
      </div>
    </div>
  )
}
