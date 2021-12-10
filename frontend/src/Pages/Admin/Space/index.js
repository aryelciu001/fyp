import React from 'react';
import Form from '../Form';
import './index.scss';

export default function Space(props) {
  return (
    <div className="space">
      <h3>{props.selectedOption}</h3>
      <Form></Form>
    </div>
  )
}