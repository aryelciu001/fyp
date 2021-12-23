import React, { useState } from 'react';
import './index.scss';
import Button from '@mui/material/Button';

export default function ProjectItemList (props) {
  const [openDesc, setOpenDesc] = useState(false);

  const toggleDesc = () => {
    setOpenDesc(!openDesc);
  }

  const reserve = (e) => {
    e.stopPropagation();
  }

  return (
    <div 
      className="project-list-item" 
      key={props.project.project_id}
    >
      <div className="project-list-item-header">
        <h4>{props.project.project_title}</h4>
        <div className="buttons">
          <Button onClick={()=>toggleDesc()} variant="contained">{openDesc ? "close" : "more"}</Button>
          <Button onClick={(e)=>reserve(e)} variant="contained">Reserve</Button>
        </div>
      </div>
      <div className={`project-list-item-body ${openDesc ? "open" : "close"}`}>
        <p>{props.project.project_desc}</p>
      </div>
    </div>
  )
}