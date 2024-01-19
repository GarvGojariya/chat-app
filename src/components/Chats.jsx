import { Avatar, Box, Typography } from '@mui/material'
import { orderBy, query } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { useFirebase } from '../context/Services'
import { ChatContext } from '../context/ChatContext'


const Chats = () => {
    const [chats, setChats] = useState([])

    const firebase = useFirebase()
    const currentUser = firebase.currentUser
    const { dispatch } = useContext(ChatContext);
    useEffect(() => {
        firebase.getChats().then((chatsData) => setChats(chatsData));
    }, [currentUser.uid,chats.length])
    const handleClick = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    }
    // console.log(chats)
    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {Object.values(chats).map((c) => (
                    <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: '#666', p: 1, gap: 2 }} onclick={handleClick}>
                        {console.log(c.userInfo)}
                        {console.log(c.userInfo)}
                        <Avatar src={c.userInfo.photoURL} />
                        <Typography sx={{ color: 'white' }}>
                            {c.userInfo.displayName}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </>
    )
}

export default Chats