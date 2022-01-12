import React, { useEffect, useState, useCallback } from 'react'
import Table from 'Pages/Admin/Table'
import { useSelector } from 'react-redux'
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
  const token = useSelector((s) => s.user.token)

  const fetchData = useCallback(() => {
    request(ApiRequestType.GET_USER, { token })
      .then((response) => setData(response.data))
      .catch((e) => alert('Something is wrong'))
  }, [token])

  const deleteItem = (data) => {
    const dataHeader = 'email'

    request(ApiRequestType.DELETE_USER, { id: data[dataHeader], token })
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
