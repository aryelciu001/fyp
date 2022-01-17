/* eslint-disable */

import React from 'react'
import { Button } from '@mui/material'
import useAxios from 'hooks/useAxios'
import { ApiRequestType } from 'utils/constant'
import './index.scss'

export default function GenerateReport() {
  const generateReservationReport = () => {

  }

  const generateSelectionReport = () => {

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
