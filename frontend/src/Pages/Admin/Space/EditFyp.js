import React, { useEffect, useState } from 'react'
import Table from '../Table'
import api from '../../../API'
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

  useEffect(() => {
    api('GET_PROJECT_LIST', { token })
      .then(response => setData(response.data))
      .catch(e => alert("Something is wrong"))
  }, [token])

  return (
    <Table 
      headers={headers} 
      data={data}
      >
    </Table>
  )
} 