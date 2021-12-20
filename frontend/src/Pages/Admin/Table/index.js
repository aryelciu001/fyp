import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './index.scss';

export default function Table (props) {



  return (
    <table>
      <thead>
        <tr>
          {
            props.headers.map(header => {
              return (
                <td>{header.title}</td>
              )
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          props.data.map(datum => {
            return (
              <>
                <tr>
                  {
                    props.headers.map(header => {
                      if (header.title === "Edit") {
                        return <td className="icon">
                          <EditIcon/>
                        </td>
                      }
                      else if (header.title === "Delete") {
                        return <td className="icon delete">
                          <DeleteForeverIcon/>
                        </td>
                      }
                      else return <td>{datum[header.key]}</td>
                    })
                  }
                </tr>
                <tr className="editor">
                  <td colSpan="100%">
                    <div>Hello</div>
                  </td>
                </tr>
              </>
            )
          })
        }
      </tbody>
    </table>
  )
}