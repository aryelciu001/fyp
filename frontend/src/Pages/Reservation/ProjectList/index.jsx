import ProjectListItem from '../ProjectListItem'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import React from 'react'
import './index.scss'

export default function ProjectList(props) {
  const reservation = useSelector((state) => state.reservation.reservation)

  return (
    <div className="project-list">
      {reservation.map((project) => (
        <ProjectListItem
          key={project.projno}
          project={project}
          userEmail={project.email}
          update={props.update}
        />
      ))}
    </div>
  )
}

ProjectList.propTypes = {
  update: PropTypes.func,
}
