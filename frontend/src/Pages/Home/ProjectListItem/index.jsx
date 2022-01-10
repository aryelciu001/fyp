import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import './index.scss'

export default function ProjectItemList(props) {
  const [openDesc, setOpenDesc] = useState(false)
  const { title, projno, summary, supervisor, email } = props.project
  const eligible = useSelector((state) => state.user.eligible)

  const toggleDesc = () => {
    setOpenDesc(!openDesc)
  }

  const reserve = (e) => {
    e.stopPropagation()
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
          { eligible ? <Button onClick={(e)=>reserve(e)} variant="contained">Reserve</Button> : '' }
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
