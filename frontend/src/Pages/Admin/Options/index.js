import React, { useState } from 'react';
import './index.scss';

export default function Options (props) {
  return (
    <div className="admin-options">
      {
        props.options.map(option => (
          <div
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