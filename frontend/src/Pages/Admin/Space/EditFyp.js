import React, { useEffect, useState, useCallback } from 'react'
import Table from 'Pages/Admin/Table'
import DialogForm from 'Pages/Admin/DialogForm'
import api from 'API'
import { useSelector } from 'react-redux'

const headers = [
  {
    title: "Edit"
  },
  {
    title: "Delete"
  },
  {
    title: "Project ID",
    key: "project_id"
  },
  {
    title: "Project Title",
    key: "project_title"
  },
  {
    title: "Project Description",
    key: "project_desc"
  },
  {
    title: "Supervisor ID",
    key: "supervisor_id"
  },
  {
    title: "Supervisor Name",
    key: "supervisor_name"
  },
]

export default function EditFyp () {
  const [data, setData] = useState([])
  const token = useSelector(s => s.user.token)

  const fetchData = useCallback(() => {
    api('GET_PROJECT_LIST', { token })
      .then(response => setData(response.data))
      .catch(e => alert("Something is wrong"))
  }, [token])

  const deleteItem = (data) => {
    let apiRequestType = 'DELETE_FYP'
    let dataHeader = 'project_id'
    
    api(apiRequestType, { id: data[dataHeader], token })
      .then(() => {
        fetchData()
        alert('Deleted!')
      })
      .catch(e => alert('Something is wrong.'))
  }

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <Table 
        headers={headers} 
        data={data}
        formType='editFyp'
        datumKey="project_id"
        fetchData={fetchData}
        deleteItem={deleteItem}
        />
      <DialogForm
        fetchData={fetchData}
        />
    </>
  )
} 