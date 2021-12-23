import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { openDialogForm } from 'Reducers/dialogform'
import { useDispatch, useSelector } from 'react-redux';
import './index.scss';
import api from 'API'

export default function Table (props) {

  const dispatch = useDispatch()
  const token = useSelector(s => s.user.token)

  const deleteItem = (data) => {
    let apiRequestType, dataHeader
    switch(props.formType) {
      case 'editFyp':
        apiRequestType = 'DELETE_FYP'
        dataHeader = 'project_id'
        break
      case 'editUser':
        apiRequestType = 'DELETE_USER'
        dataHeader = 'email'
        break
      default:
        return
    }
    api(apiRequestType, { id: data[dataHeader], token })
      .then(() => alert('Deleted!'))
      .catch(e => alert('Something is wrong.'))
  }

  const TdGenerator = ({ header, data }) => {
    switch(header.title) {
      case 'Edit':
        return (
          <td className="icon">
            <EditIcon
              onClick={() => dispatch(openDialogForm({formType: props.formType, data}))}
              />
          </td>
        )
      case 'Delete':
        return (
          <td className="icon delete">
            <DeleteForeverIcon
              onClick={() => deleteItem(data)}
              />
          </td>
        )
      default:
        return (
          <td>{data[header.key].slice(0, 100)}</td>
        )
    }
  }

  return (
    <table>
      <thead>
        <tr>
          {
            props.headers.map((header, i) => (
              <td key={i}>{header.title}</td>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          props.data.map((data, i) => (
            <tr key={i}>
              { props.headers.map((header, index) => <TdGenerator header={header} key={index} data={data}/>) }
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}