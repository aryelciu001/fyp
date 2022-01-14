import ProjectListItem from '../ProjectListItem'
import PropTypes from 'prop-types'
import React from 'react'
import './index.scss'

export default function ProjectList(props) {
  return (
    <div className="project-list">
      {props.list.map((project) => (
        <ProjectListItem
          key={project.projno}
          project={project}
          userEmail={project.email}
          update={props.update}
          type={props.type}
        />
      ))}
    </div>
  )
}

ProjectList.propTypes = {
  update: PropTypes.func,
  list: PropTypes.array,
  type: PropTypes.string,
}
