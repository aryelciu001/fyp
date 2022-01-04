import React, { useEffect, useState, useCallback } from 'react'
import Table from 'Pages/Admin/Table'
import api from 'API'
import { useSelector } from 'react-redux'
import { ApiRequestType } from 'utils/constant'
import DialogForm from 'Pages/Admin/DialogForm'
import { UserSchema } from 'utils/schema'

const headers = [
  {
    title: 'Edit',
  },
  {
    title: 'Delete',
  },
  ...UserSchema,
]

export default function EditUser() {
  const [data, setData] = useState([])
  const token = useSelector((s) => s.user.token)

  const fetchData = useCallback(() => {
    api(ApiRequestType.GET_USER, { token })
      .then((response) => setData(response.data))
      .catch((e) => alert('Something is wrong'))
  }, [token])

  const deleteItem = (data) => {
    const dataHeader = 'email'

    api(ApiRequestType.DELETE_USER, { id: data[dataHeader], token })
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
        formType='editUser'
        datumKey="email"
        deleteItem={deleteItem}
      />
      <DialogForm
        fetchData={fetchData}
      />
    </>
  )
}
