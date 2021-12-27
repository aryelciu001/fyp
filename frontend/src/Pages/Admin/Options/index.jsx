import React from 'react'
import PropTypes from 'prop-types'
import './index.scss'

export default function Options(props) {
  return (
    <div className="admin-options">
      {
        props.options.map((option) => (
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
  options: PropTypes.arrayOf(String),
  selectedOption: PropTypes.string,
  setSelectedOption: PropTypes.func,
}
