import React from 'react'
import PropTypes from 'prop-types'
import ProjectListItem from 'Pages/Home/ProjectListItem'
import './index.scss'

export default function ProjectList(props) {
  return (
    <div className="project-list">
      {
        props.projectList.map((project) => (
          <ProjectListItem key={project.project_id} project={project}/>
        ))
      }
    </div>
  )
}

ProjectList.propTypes = {
  projectList: PropTypes.array,
}
