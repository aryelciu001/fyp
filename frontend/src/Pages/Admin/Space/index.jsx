import React from 'react'
import PropTypes from 'prop-types'
import AddFyp from 'Pages/Admin/Space/AddFyp'
import AddUser from 'Pages/Admin/Space/AddUser'
import EditFyp from 'Pages/Admin/Space/EditFyp'
import EditUser from 'Pages/Admin/Space/EditUser'
import './index.scss'

export default function Space(props) {
  return (
    <div className="space">
      <h3>{props.selectedOption}</h3>
      {
        spaceGenerator(props.selectedOption, props.token)
      }
    </div>
  )
}

function spaceGenerator(option, token) {
  switch (option) {
    case 'Add FYP':
      return <AddFyp token={token}></AddFyp>
    case 'Edit FYP':
      return <EditFyp token={token}></EditFyp>
    case 'Add User':
      return <AddUser token={token}></AddUser>
    case 'Edit User':
      return <EditUser token={token}></EditUser>
    case 'View Reservations':
      return ''
    case 'Generate Report':
      return ''
    default:
      return ''
  }
}

Space.propTypes = {
  selectedOption: PropTypes.string,
  token: PropTypes.string,
}
