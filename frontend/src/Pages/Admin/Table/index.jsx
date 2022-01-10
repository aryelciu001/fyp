import React from 'react'
import PropTypes from 'prop-types'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { openDialogForm } from 'Reducers/dialogform'
import { useDispatch } from 'react-redux'
import './index.scss'

export default function Table(props) {
  const dispatch = useDispatch()

  const TdGenerator = ({ header, data }) => {
    switch (header.type) {
      case 'edit':
        return (
          <td className="icon">
            <EditIcon
              onClick={() => dispatch(openDialogForm({ formType: props.formType, data }))}
            />
          </td>
        )
      case 'delete':
        return (
          <td className="icon delete">
            <DeleteForeverIcon
              onClick={() => props.deleteItem(data)}
            />
          </td>
        )
      case 'boolean':
        return (
          <td>
            { data[header.key] ? 'true' : 'false' }
          </td>
        )
      default:
        return (
          <td>
            { data[header.key].length ? data[header.key].slice(0, 100) : data[header.key]}
          </td>
        )
    }
  }

  return (
    <table>
      <thead>
        <tr>
          {
            props.headers.map((header, i) => (
              <td key={i}>{header.text}</td>
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

Table.propTypes = {
  headers: PropTypes.array,
  header: PropTypes.object,
  data: PropTypes.arrayOf(Object),
  formType: PropTypes.string,
  deleteItem: PropTypes.func,
}
