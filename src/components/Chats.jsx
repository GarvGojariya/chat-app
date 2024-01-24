import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Services'



const Chats = () => {
    const [chats, setChats] = useState([])
    const firebase = useFirebase()
    const currentUser = firebase.currentUser
    const handleSelect = (userInfo) => {
        firebase.handleUserChange(userInfo)
    };
    
    useEffect(() => {
        firebase.getChats().then((chatsData) => setChats(chatsData));
    }, [currentUser.uid, firebase,currentUser,]);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {chats &&
                    Object.values(chats).map((c) => (
                        <Box
                            key={c.date}
                            sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: '#666', p: 1, gap: 2, cursor: 'pointer' }}
                            onClick={() => handleSelect(c.userInfo)}>
                            <Avatar src={c.userInfo.photoURL} key={'photo'} />
                            <Box sx={{display:'grid'}}>
                            <Typography sx={{ color: 'white' }}>
                                {c.userInfo.displayName}
                            </Typography>
                            <Typography sx={{ color: 'gray' ,fontSize:'12px'}}>
                                {c.lastMessage?.message}
                            </Typography>
                            </Box>
                        </Box>
                    ))}
            </Box>
        </>
    )
}

export default Chats