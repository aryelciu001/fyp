import React, { useEffect, useState, useCallback } from 'react'
import Table from 'Pages/Admin/Table'
import api from 'API'
import { useSelector } from 'react-redux'
import DialogForm from 'Pages/Admin/DialogForm'

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

export default function EditUser () {
  const [data, setData] = useState([])
  const token = useSelector(s => s.user.token)

  const fetchData = useCallback(() => {
    api('GET_USER', { token })
      .then(response => setData(response.data))
      .catch(e => alert("Something is wrong"))
  }, [token])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <Table 
        headers={headers} 
        data={data}
        formType='editUser'
        datumKey="email"
        fetchData={fetchData}
        />
      <DialogForm/>
    </>
  )
} 