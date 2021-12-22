import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialogForm } from 'Reducers/dialogform'
import FypForm from 'Pages/Admin/Form/FypForm'
import './index.scss'

export default function FormDialog() {
  const formType = useSelector(s => s.dialogForm.formType)
  const dispatch = useDispatch()
  const open = Boolean(formType)

  return (
    <div className="dialog-form">
      <Dialog open={open} onClose={() => dispatch(closeDialogForm())}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <div className="form-content">
            { getForm(formType) }
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function getForm(type) {
  switch(type){
    case 'editFyp':
      return editFypForm()
    default:
      return ''
  }
}

function editFypForm() {
  return <FypForm 
    formType="editFyp"
    />
}