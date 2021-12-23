import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { closeDialogForm } from 'Reducers/dialogform'
import FypForm from 'Pages/Admin/Form/FypForm'
import UserForm from 'Pages/Admin/Form/UserForm'
import './index.scss'

export default function FormDialog(props) {
  const formType = useSelector(s => s.dialogForm.formType)
  const data = useSelector(s => s.dialogForm.data)
  const dispatch = useDispatch()
  const open = Boolean(formType)
  const { fetchData } = props

  const TheForm = () => {
    switch(formType){
      case 'editFyp':
        return <EditFypForm/>
      case 'editUser':
        return <EditUserForm/>
      default:
        return ''
    }
  }
  
  function EditFypForm() {
    return <FypForm 
      data={data}
      formType="editFyp"
      />
  }
  
  function EditUserForm() {
    return <UserForm 
      data={data}
      formType="editUser"
      />
  }

  useEffect(() => {
    fetchData()
  }, [open, fetchData])

  return (
    <div>
      <Dialog open={open} onClose={() => dispatch(closeDialogForm())}>
        <DialogTitle>Edit</DialogTitle>
        <DialogContent>
          <div className="form-container">
            <TheForm></TheForm>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}