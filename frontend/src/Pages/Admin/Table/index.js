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

  const deleteItem = (projectId) => {
    api('DELETE_FYP', { id: projectId, token })
      .then(() => alert('Deleted!'))
      .catch(e => alert('Something is wrong.'))
  }

  return (
    <table>
      <thead>
        <tr>
          {
            props.headers.map((header, i) => {
              return (
                <td key={i}>{header.title}</td>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          props.data.map((datum, i) => {
            return (
              <React.Fragment key={i}>
                <tr>
                  {
                    props.headers.map((header, index) => {
                      if (header.title === "Edit") {
                        return <td key={index} className="icon">
                          <EditIcon
                            onClick={() => dispatch(openDialogForm({formType: props.formType, data: datum}))}
                            />
                        </td>
                      }
                      else if (header.title === "Delete") {
                        return <td key={index} className="icon delete">
                          <DeleteForeverIcon
                            onClick={() => deleteItem(datum[props.datumKey])}
                            />
                        </td>
                      }
                      else return <td key={index}>{datum[header.key]}</td>
                    })
                  }
                </tr>
                <tr className="editor">
                  <td colSpan="100%">
                    <div>Hello</div>
                  </td>
                </tr>
              </React.Fragment>
            )
          })
        }
      </tbody>
    </table>
  )
}