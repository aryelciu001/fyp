import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { useSelector } from 'react-redux'
import api from '../../../API'

export default function AddFyp () {

  const [projectTitle, setProjectTitle] = useState('')
  const [projectId, setProjectId] = useState('')
  const [projectInfo, setProjectInfo] = useState('')
  const [supervisorName, setSupervisorName] = useState('')
  const [supervisorId, setSupervisorIde] = useState('')
  const token = useSelector(s => s.user.token)

  const submit = () => {

    if (!projectTitle) {
      alert("Project title is empty!")
      return
    }
    if (!projectId) {
      alert("Project ID is empty!")
      return
    }
    if (!projectInfo) {
      alert("Project info is empty!")
      return
    }
    if (!supervisorName) {
      alert("Supervisor name is empty!")
      return
    }
    if (!supervisorId) {
      alert("Supervisor ID is empty!")
      return
    }
    
    const payload = {
      projectTitle,
      projectId,
      projectInfo,
      supervisorName,
      supervisorId,
      token
    }

    api('POST_FYP', payload)
      .then(() => {
        alert('FYP Created!')
        setProjectTitle('')
        setProjectId('')
        setProjectInfo('')
        setSupervisorName('')
        setSupervisorIde('')
      })
      .catch((e) => {
        switch (e.response.data.code) {
          case 'ER_DUP_ENTRY':
            alert('Duplicate entry with the same ID')
            break
          default:
            alert('Something is wrong')
        }
      })
  }

  return (
    <div className="form">
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
    </div>
  )
}