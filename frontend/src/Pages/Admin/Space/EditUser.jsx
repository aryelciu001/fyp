import React, { useEffect, useState, useCallback } from 'react'
import Table from 'Pages/Admin/Table'
import { ApiRequestType } from 'utils/constant'
import DialogForm from 'Pages/Admin/DialogForm'
import { UserSchema } from 'utils/schema'
import useAxios from 'hooks/useAxios'

const headers = [
  {
    text: 'Edit',
    type: 'edit',
  },
  {
    text: 'Delete',
    type: 'delete',
  },
  ...UserSchema,
]

export default function EditUser() {
  const request = useAxios()
  const [data, setData] = useState([])

  const fetchData = useCallback(() => {
    request(ApiRequestType.GET_USER)
      .then((response) => setData(response.data))
      .catch((e) => alert('Something is wrong'))
  }, [])

  const deleteItem = (data) => {
    const dataHeader = 'email'

    request(ApiRequestType.DELETE_USER, { id: data[dataHeader] })
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
    <div className='space-content'>
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
    </div>
  )
}
