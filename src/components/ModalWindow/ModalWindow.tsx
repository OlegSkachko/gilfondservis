import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Alert, Input, Snackbar } from '@mui/material';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import {IModalProps, IUser} from './../../types/user'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  display: 'flex',
  flexDirection: 'column',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const initialUser = {name:'',id: '', username: '', email: ''}

export default function ModalWindow({open, setOpen, type, id }: IModalProps) {
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const { deleteUser, editUser} = useActions()
  const {users} = useTypedSelector(state=>state.user)
  const [user, setUser] = useState<IUser>({...initialUser, id:id})
  const handleClose = () => setOpen(false);
  const handleCloseAlert = () => setOpenAlert(false)
  useEffect(()=>{
    const newUser = users.filter((el)=>el.id === id)
    if(newUser[0]) {
      setUser(newUser[0])
    }
  },[id])

  const handleRemoveUser = () => {
    deleteUser(id, users)
    handleClose()
  }
   
  const handleEditUser = () => {
    if(user.name !=='' && user.email !== '' && user.username !== '') {
      const newUser = {...user}
      editUser(id, newUser, users)
      handleClose()
    } else {
      setOpenAlert(true)
    }
  }

  const handleInput = (value: string, type: string) => {
    switch(type) {
      case 'name': 
        setUser({...user, name: value})
        break;
      case 'username': 
        setUser({...user, username: value})
        break;
      case 'email': 
        setUser({...user, email: value})
        break;
    }

  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          {
            type === 'deleteUser' && (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Вы точно хотите удалить?
                </Typography>
                <div style={{alignSelf: 'end'}}>
                  <Button size="small" onClick={handleRemoveUser}>Да</Button>
                  <Button size="small" onClick={handleClose}>Нет</Button>
                </div>
              </>
            )
          }
          {
            type === 'editUser' && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">Имя</Typography>
              <Input value={user.name} onChange={(e)=>handleInput(e.target.value, 'name')}/>
              <Input value={user.username} onChange={(e)=>handleInput(e.target.value, 'username')}/>
              <Input value={user.email} onChange={(e)=>handleInput(e.target.value, 'email')}/>
              <div>
                <Button size="small" onClick={handleEditUser} >Сохранить</Button>
                <Button size="small" onClick={handleClose}>Отмена</Button>
              </div>
            </>
            )
          }
        </Box>
      </Modal>
      <Snackbar 
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center'}}
            open={openAlert} 
            autoHideDuration={6000} 
            onClose={handleCloseAlert}
           
          >
            <Alert onClose={handleCloseAlert} severity="warning" sx={{ width: '100%' }}>
              Поля не должны быть пустыми
            </Alert>
          </Snackbar>
    </>
     
  )
}
