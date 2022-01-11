import React from 'react'
import PropTypes from 'prop-types'
import ProjectListItem from '../ProjectListItem'
import './index.scss'

export default function ProjectList(props) {
  return (
    <div className="project-list">
      {
        props.projectList.map((project) => (
          <ProjectListItem key={project.projno} project={project}/>
        ))
      }
    </div>
  )
}

ProjectList.propTypes = {
  projectList: PropTypes.array,
}
