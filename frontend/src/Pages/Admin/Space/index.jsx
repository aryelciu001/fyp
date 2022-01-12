import React from 'react'
import PropTypes from 'prop-types'
import AddFyp from 'Pages/Admin/Space/AddFyp'
import AddUser from 'Pages/Admin/Space/AddUser'
import EditFyp from 'Pages/Admin/Space/EditFyp'
import EditUser from 'Pages/Admin/Space/EditUser'
import FypSelection from 'Pages/Admin/Space/FypSelection'
import './index.scss'

export default function Space(props) {
  return (
    <div className="space">
      <h3>{props.selectedOption}</h3>
      {
        spaceGenerator(props.selectedOption)
      }
    </div>
  )
}

function spaceGenerator(option) {
  switch (option) {
    case 'Add FYP':
      return <AddFyp></AddFyp>
    case 'Edit FYP':
      return <EditFyp></EditFyp>
    case 'Add User':
      return <AddUser></AddUser>
    case 'Edit User':
      return <EditUser></EditUser>
    case 'FYP Selection':
      return <FypSelection></FypSelection>
    case 'Generate Report':
      return ''
    default:
      return ''
  }
}

Space.propTypes = {
  selectedOption: PropTypes.string,
}
