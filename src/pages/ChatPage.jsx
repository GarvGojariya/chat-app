import React, { useEffect } from 'react'
import { useFirebase } from '../context/Services'
import Sidebar from '../components/Sidebar'
import InputMessage from '../components/InputMessage'
import { Avatar, Box, Typography } from '@mui/material'
import Messages from '../components/Messages'
import { useNavigate } from 'react-router-dom'

const ChatPage = () => {
    const firebase = useFirebase()
    const navigate = useNavigate()
    const data = firebase.contextData
    const currentUser = firebase.currentUser
   useEffect(() => {
    if (!currentUser){
        navigate('/login')
    }
   }, [currentUser,navigate])
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'end',bgcolor:'#666' }}>
                <Sidebar />
                <Box sx={{ display: 'grid', position: 'relative',width:'100%' ,height:'100vh',alignItems:'center'}}>
                    <Box sx={{bgcolor:'#262626',display:'flex',top:0,position:'relative',height:'fit-content',alignItems:'center'}}>
                        <Avatar src={data.user.photoURL}/>
                        <Typography  color="white">{data.user.displayName}</Typography>
                    </Box>
                    <Messages />
                    <InputMessage />
                </Box>
            </Box>
        </>
    )
}

export default ChatPage