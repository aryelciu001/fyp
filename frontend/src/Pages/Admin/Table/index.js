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
                          <EditIcon/>
                        </td>
                      }
                      else if (header.title === "Delete") {
                        return <td key={index} className="icon delete">
                          <DeleteForeverIcon/>
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