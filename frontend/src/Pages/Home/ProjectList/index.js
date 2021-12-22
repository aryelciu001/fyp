import React from 'react';
import ProjectListItem from '../ProjectListItem';
import './index.scss';

export default function ProjectList (props) {
  return (
    <div className="project-list">
      {
        props.projectList.map(project => (
          <ProjectListItem key={project.project_id} project={project}/>
        ))
      }
    </div>
  )
}