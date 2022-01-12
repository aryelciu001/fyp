import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'
import { options } from 'utils/constant'

export default function Options(props) {
  return (
    <div className="admin-options">
      {
        options.map((option) => (
          <div
            key={option}
            className={`admin-options-option 
              ${
                props.selectedOption === option ?
                'admin-options-option-selected' : ''
          }`
            }
            onClick={()=>props.setSelectedOption(option)}
          >
            { option }
          </div>
        ))
      }
    </div>
  )
}

Options.propTypes = {
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func,
}
