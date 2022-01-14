import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import { ApiRequestType } from 'utils/constant'
import './index.scss'
import useAxios from 'hooks/useAxios'
import { ErrorCode } from 'utils/constant'

export default function ProjectItemList(props) {
  const request = useAxios()
  const [openDesc, setOpenDesc] = useState(false)
  const { update, project } = props
  const { title, projno, summary, supervisor, email } = project.project

  const toggleDesc = () => {
    setOpenDesc(!openDesc)
  }

  const unreserve = () => {
    const payload = {
      email: props.userEmail,
      projno,
    }
    request(ApiRequestType.DELETE_RESERVATION, payload)
      .then((res) => {
        alert('Project unreserved')
        update()
      })
      .catch((e) => {
        alert('something is wrong')
      })
  }

  const select = () => {
    const payload = {
      email: props.userEmail,
      projno,
    }
    request(ApiRequestType.SELECT, payload)
      .then((res) => {
        alert('Project selected')
        update()
      })
      .catch((e) => {
        switch (e.response.data.code) {
          case ErrorCode.SELECTION_CLOSED:
            alert('You cannot select your project yet')
            break
          case ErrorCode.PROJECT_SELECTED:
            alert('Project has been selected by another user')
            break
          case ErrorCode.USER_HAS_SELECTED:
            alert('You have selected a project')
            break
          default:
            alert('something is wrong')
        }
      })
  }

  return (
    <div
      className="project-list-item"
      key={projno}
    >
      <div className="project-list-item-header">
        <h4>{title}</h4>
        <div className="buttons">
          {
            props.type === 'reservation' ?
            <>
              <Button onClick={unreserve} variant="contained" color="secondary">Unreserve</Button>
              <Button onClick={select} variant="contained">Select</Button>
            </> : null
          }
          <Button onClick={()=>toggleDesc()} variant="contained">{openDesc ? 'close' : 'more'}</Button>
        </div>
      </div>
      <div className={`project-list-item-body ${openDesc ? 'open' : 'close'}`}>
        <p>Supervisor: {supervisor}</p><br/>
        <p>Email: {email}</p><br/>
        <p>{summary}</p>
      </div>
    </div>
  )
}

ProjectItemList.propTypes = {
  project: PropTypes.object,
  userEmail: PropTypes.string,
  update: PropTypes.func,
  type: PropTypes.string,
}
