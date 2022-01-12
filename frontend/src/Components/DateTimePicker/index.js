import * as React from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import PropTypes from 'prop-types'

export default function DateTimePickerMUI(props) {
  const { value, setValue, label } = props

  const handleChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label={label}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  )
}

DateTimePickerMUI.propTypes = {
  value: PropTypes.object,
  setValue: PropTypes.func,
  label: PropTypes.string,
}
