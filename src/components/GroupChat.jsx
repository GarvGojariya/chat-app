import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Services'
import { Avatar, Box, Typography } from '@mui/material'

const GroupChat = () => {
    const [chats, setChats] = useState([])
    const firebase = useFirebase()
    const currentUser = firebase.currentUser
    useEffect(() => {
        firebase.getGroupChats().then((chatsData) => setChats(chatsData));
    }, [currentUser.uid, firebase]);
    const handleSelect = (groupInfo) => {
        firebase.handleGroupChange(groupInfo)
    };

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {chats &&
                    Object.values(chats).map((c) => (
                        <Box
                            // key={c.date}
                            sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: '#666', p: 1, gap: 2, cursor: 'pointer' }}
                            onClick={() => handleSelect(c.groupInfo)}>
                            <Avatar src={c.groupInfo.photoURL} alt='image' key={'photo'} />
                            {/* {console.log(c)} */}
                            <Typography sx={{ color: 'white' }}>
                                {c.groupInfo.displayName}
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

export default GroupChat