import React from 'react';
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
                      if (header.title === "Edit") return <td>Edit</td>
                      else if (header.title === "Delete") return <td>Delete</td>
                      else return <td>{datum[header.key]}</td>
                    })
                  }
                </tr>
                <div className="editor">Hello</div>
              </>
            )
          })
        }
      </tbody>
    </table>
  )
}