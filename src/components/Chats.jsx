import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Services'



const Chats = () => {
    const [chats, setChats] = useState([])
    const firebase = useFirebase()
    const currentUser = firebase.currentUser
    useEffect(() => {
        firebase.getChats().then((chatsData) => setChats(chatsData));
    }, [currentUser.uid, firebase]);
    const handleSelect = (userInfo) => {
        firebase.handleUserChange(userInfo)
    };
    
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
                            <Typography sx={{ color: 'white' }}>
                                {c.userInfo.displayName}
                            </Typography>
                            {/* <Typography sx={{ color: 'white' }}>
                                {c.lastMessage.message}
                            </Typography> */}
                        </Box>
                    ))}
            </Box>
        </>
    )
}

export default Chats