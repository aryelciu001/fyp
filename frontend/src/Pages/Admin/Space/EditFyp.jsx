import React, { useEffect, useState, useCallback } from 'react'
import Table from 'Pages/Admin/Table'
import DialogForm from 'Pages/Admin/DialogForm'
import api from 'API'
import { useSelector } from 'react-redux'

const headers = [
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
  {
    title: 'Project Number',
    key: 'projno',
  },
  {
    title: 'Project Title',
    key: 'title',
  },
  {
    title: 'Project Summary',
    key: 'summary',
  },
  {
    title: 'Supervisor Email',
    key: 'email',
  },
  {
    title: 'Supervisor Name',
    key: 'supervisor',
  },
]

export default function EditFyp() {
  const [data, setData] = useState([])
  const token = useSelector((s) => s.user.token)

  const fetchData = useCallback(() => {
    api('GET_PROJECT_LIST', { token })
        .then((response) => setData(response.data))
        .catch((e) => alert('Something is wrong'))
  }, [token])

  const deleteItem = (data) => {
    const apiRequestType = 'DELETE_FYP'
    const dataHeader = 'projno'

    api(apiRequestType, { id: data[dataHeader], token })
        .then(() => {
          fetchData()
          alert('Deleted!')
        })
        .catch((e) => alert('Something is wrong.'))
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
        datumKey="projno"
        fetchData={fetchData}
        deleteItem={deleteItem}
      />
      <DialogForm
        fetchData={fetchData}
      />
    </>
  )
}
