import React, { useEffect, useState } from 'react';
import Table from '../Table';
import axios from 'axios';
const API = process.env.REACT_APP_API;
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

export default function EditFyp (props) {
  const [data, setData] = useState([])

  useEffect(() => {
    let url = `${API}/project`
    return axios.get(url)
      .then(response => setData(response.data))
      .catch(e => alert("Something is wrong"))
  }, [])

  return (
    <Table 
      headers={headers} 
      data={data}
      >
    </Table>
  )
} 