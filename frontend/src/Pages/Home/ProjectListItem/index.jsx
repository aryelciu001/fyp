import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import api from 'API'
import { ApiRequestType } from 'utils/constant'
import './index.scss'

export default function ProjectItemList(props) {
  const [openDesc, setOpenDesc] = useState(false)
  const { title, projno, summary, supervisor, email } = props.project
  const eligible = useSelector((state) => state.user.eligible)
  const userEmail = useSelector((state) => state.user.email)
  const token = useSelector((state) => state.user.token)

  const toggleDesc = () => {
    setOpenDesc(!openDesc)
  }

  const reserve = () => {
    const payload = {
      email: userEmail,
      projno,
      token,
    }
    api(ApiRequestType.POST_RESERVATION, payload)
      .then(() => alert('Project reserved!'))
      .catch((e) => alert('Something is wrong'))
  }

  return (
    <div
      className="project-list-item"
      key={projno}
    >
      <div className="project-list-item-header">
        <h4>{title}</h4>
        <div className="buttons">
          <Button onClick={()=>toggleDesc()} variant="contained">{openDesc ? 'close' : 'more'}</Button>
          { eligible ? <Button onClick={reserve} variant="contained">Reserve</Button> : '' }
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
}
