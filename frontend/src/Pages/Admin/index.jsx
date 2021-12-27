import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Options from 'Pages/Admin/Options'
import Space from 'Pages/Admin/Space'
import './index.scss'

const options = ['Add FYP', 'Edit FYP', 'Add User', 'Edit User', 'View Reservations', 'Generate Report']

export default function Admin(props) {
  const [selectedOption, setSelectedOption] = useState('Add FYP')

  return (
    <div className="admin">
      <Options
        selectedOption={selectedOption}
        options={options}
        setSelectedOption={setSelectedOption}
      ></Options>
      <Space
        token={props.token}
        selectedOption={selectedOption}
      ></Space>
    </div>
  )
}

Admin.propTypes = {
  token: PropTypes.string,
}
