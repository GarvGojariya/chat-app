import React from 'react'
import { useFirebase } from '../context/Services'
import Sidebar from '../components/Sidebar'
import InputMessage from '../components/InputMessage'
import { Avatar, Box, Typography } from '@mui/material'
import Messages from '../components/Messages'

const ChatPage = () => {
    const firebase = useFirebase()
    const data = firebase.contextData
    console.log(data)
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'end' }}>
                <Sidebar />
                <Box sx={{ display: 'grid', position: 'relative',width:'100%' ,height:'100vh',alignItems:'center'}}>
                    <Box sx={{bgcolor:'#262626',display:'flex',position:'absolute',top:0,position:'relative',height:'fit-content',alignItems:'center'}}>
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