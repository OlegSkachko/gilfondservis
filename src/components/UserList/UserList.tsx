import { CircularProgress, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { useActions } from '../../hooks/useActions';
import ModalWindow from '../ModalWindow/ModalWindow';

export default function UserList() {
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [typeModal,setTypeModal] = useState<string>('')
    const [id, setId] = useState<string>('')
    const {users, error, loading} = useTypedSelector(state=>state.user)
    const {fetchUsers} = useActions()
  
    useEffect(()=> {
        fetchUsers()
    }, [])

    if(loading) {
        return (
        <Box  sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100vh',
          }}>
            <CircularProgress/>
        </Box>
    )}

    if(error) {
        return <Alert severity="error">{error}</Alert>
    }

    const handleUser = (id: string, type: string) => {
        setTypeModal(type)
        setOpenModal(true)
        setId(id)
    }

  return (
    <div>
        <ModalWindow open={openModal} setOpen={setOpenModal} type={typeModal} id={id}/>
        {
            users.map(user=> 
                <Card key={user.id} variant="outlined" sx={{ margin: 5, mt: 5 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                           {user.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                           {user.username}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                           {user.email}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={()=> handleUser(user.id, 'deleteUser')}>Удалить</Button>
                        <Button size="small" onClick={()=> handleUser(user.id, 'editUser')}>Изменить</Button>
                    </CardActions>
              </Card>
            )
        }
    </div>
  )
}
