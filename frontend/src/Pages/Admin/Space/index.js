import React from 'react';
import './index.scss';

export default function Space(props) {
  return (
    <div className="space">
      <h3>{props.selectedOption}</h3>
    </div>
  )
}