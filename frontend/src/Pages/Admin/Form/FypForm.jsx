import React, { useState, useEffect } from 'react'
import { TextField, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import api from 'API'
import './index.scss'

export default function FypForm(props) {
  console.log(props.data)
  const [projectTitle, setProjectTitle] = useState(props.data ? props.data.project_title : '')
  const [projectId, setProjectId] = useState(props.data ? props.data.project_id : '')
  const [projectInfo, setProjectInfo] = useState(props.data ? props.data.project_desc : '')
  const [supervisorName, setSupervisorName] = useState(props.data ? props.data.supervisor_name : '')
  const [supervisorId, setSupervisorIde] = useState(props.data ? props.data.supervisor_id : '')
  const [apiRequestType, setApiRequestType] = useState('')
  const [apiResponseString, setApiResponseString] = useState('')
  const [buttonString, setButtonString] = useState('')
  const token = useSelector(s => s.user.token)
  const { formType } = props

  useEffect(() => {
    switch(formType) {
      case 'addFyp':
        setApiRequestType('POST_FYP')
        setApiResponseString('FYP Created!')
        setButtonString("Add Fyp")
        break
      case 'editFyp':
        setApiRequestType('PUT_FYP')
        setApiResponseString('FYP Edited!')
        setButtonString("Edit Fyp")
        break
      default: 
        return
    }
  }, [formType])

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

    api(apiRequestType, payload)
      .then(() => {
        alert(apiResponseString)
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
    <div className="form-content">
      <div className="form-content-row">
        <TextField 
          label="Project Title"
          variant="outlined" 
          onChange={(e) => setProjectTitle(e.target.value)}
          value={projectTitle}
          />
      </div>
      <div className="form-content-row">
        <TextField 
          label="Project ID"
          variant="outlined" 
          onChange={(e) => setProjectId(e.target.value)}
          value={projectId}
          />
      </div>
      <div className="form-content-row">
        <TextField
          label="Project Information"
          multiline
          rows={4}
          onChange={(e) => setProjectInfo(e.target.value)}
          value={projectInfo}
          />
      </div>
      <div className="form-content-row">
        <TextField 
          label="Supervisor Name"
          variant="outlined" 
          onChange={(e) => setSupervisorName(e.target.value)}
          value={supervisorName}
          />
      </div>
      <div className="form-content-row">
        <TextField 
          label="Supervisor ID"
          variant="outlined" 
          onChange={(e) => setSupervisorIde(e.target.value)}
          value={supervisorId}
          />
      </div>
      <div className="form-content-row">
        <Button onClick={submit}>{ buttonString }</Button>
      </div>
    </div>
  )
}