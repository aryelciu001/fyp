import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import axios from 'axios';

export default function (props) {

  const [projectTitle, setProjectTitle] = useState('')
  const [projectId, setProjectId] = useState('')
  const [projectInfo, setProjectInfo] = useState('')
  const [supervisorName, setSupervisorName] = useState('')
  const [supervisorId, setSupervisorIde] = useState('')

  const submit = () => {
    const API = process.env.REACT_APP_API
    const url = `${API}/project` 
    const req = {
      body: {
        projectTitle,
        projectId,
        projectInfo,
        supervisorName,
        supervisorId,
      }
    }
    axios.post(url, body)
      .then((res) => console.log(res))
  }

  return (
    <>
      <div className="form-row">
        <TextField 
          label="Project Title"
          variant="outlined" 
          onChange={(e) => setProjectTitle(e.target.value)}
          value={projectTitle}
          />
      </div>
      <div className="form-row">
        <TextField 
          label="Project ID"
          variant="outlined" 
          onChange={(e) => setProjectId(e.target.value)}
          value={projectId}
          />
      </div>
      <div className="form-row">
        <TextField
          label="Project Information"
          multiline
          rows={4}
          onChange={(e) => setProjectInfo(e.target.value)}
          value={projectInfo}
          />
      </div>
      <div className="form-row">
        <TextField 
          label="Supervisor Name"
          variant="outlined" 
          onChange={(e) => setSupervisorName(e.target.value)}
          value={supervisorName}
          />
      </div>
      <div className="form-row">
        <TextField 
          label="Supervisor ID"
          variant="outlined" 
          onChange={(e) => setSupervisorIde(e.target.value)}
          value={supervisorId}
          />
      </div>
      <Button onClick={submit}>Add FYP</Button>
    </>
  )
}