import React, { useContext } from 'react';
import ProjectListItem from '../ProjectListItem';
import GlobalContext from '../../GlobalContext';
import './index.scss';

export default function ProjectList (props) {
  const context = useContext(GlobalContext);
  
  return (
    <div className="project-list">
      {
        context.projectList.map(project => (
          <ProjectListItem key={project.id} project={project}/>
        ))
      }
    </div>
  )
}