import React, { useState } from 'react';
import './index.scss';

export default function ProjectItemList (props) {
  const [openDesc, setOpenDesc] = useState(false);

  const toggleDesc = () => {
    setOpenDesc(!openDesc);
  }

  return (
    <div 
      className="project-list-item" 
      key={props.project.id}
    >
      <div className="project-list-item-header" onClick={()=>toggleDesc()}>
        <h2>{props.project.title}</h2>
      </div>
      <div className={`project-list-item-body ${openDesc ? "open" : "close"}`}>
        <p>{props.project.description}</p>
      </div>
    </div>
  )
}