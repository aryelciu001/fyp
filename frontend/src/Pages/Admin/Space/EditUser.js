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
    title: "Email",
    key: "email"
  },
  {
    title: "Role",
    key: "role"
  },
  {
    title: "Matriculation Number",
    key: "matriculation_number"
  },
]

export default function EditUser (props) {
  const [data, setData] = useState([])

  useEffect(() => {
    let url = `${API}/user`
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