import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { ApiRequestType, UserType } from 'utils/constant'
import './index.scss'
import useAxios from 'hooks/useAxios'

export default function ProjectItemList(props) {
  const request = useAxios()
  const [openDesc, setOpenDesc] = useState(false)
  const { title, projno, summary, supervisor, email } = props.project
  const { eligible, role } = useSelector((state) => state.user)
  const userEmail = useSelector((state) => state.user.email)

  const toggleDesc = () => {
    setOpenDesc(!openDesc)
  }

  const reserve = () => {
    const payload = {
      email: userEmail,
      projno,
    }
    request(ApiRequestType.POST_RESERVATION, payload)
      .then(() => alert('Project reserved!'))
      .catch((e) => {
        switch (e.response.data.code) {
          case 'ER_DUP_ENTRY':
            alert('You have reserved this project')
            break
          default:
            alert('Something is wrong')
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
          <Button onClick={()=>toggleDesc()} variant="contained">{openDesc ? 'close' : 'more'}</Button>
          { eligible && role === UserType.STUDENT ? <Button onClick={reserve} variant="contained">Reserve</Button> : '' }
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
