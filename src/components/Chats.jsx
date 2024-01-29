import { Avatar, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Services'

function convertTimestampToHHMM(timestampSeconds, timestampNanoseconds) {
    const timestampMillis = timestampSeconds * 1000 + Math.round(timestampNanoseconds / 1e6);
    const date = new Date(timestampMillis);

    const formattedTime = new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(date);

    return formattedTime;
}

const Chats = () => {
    const [chats, setChats] = useState([])
    const firebase = useFirebase()
    const currentUser = firebase.currentUser
    const handleSelect = async (userInfo) => {
        await firebase.handleUserChange(userInfo);
    };

    // useEffect(() => {
    //     firebase.getChats().then((chatsData) => {
    //         const sortedChats = Object.values(chatsData).sort((a, b) => b.date - a.date);
    //         setChats(sortedChats);
    //     });
    // }, [currentUser.uid, firebase, currentUser]);
    useEffect(() => {
        const unsubscribe = firebase.getChats((chatsData) => {
            if (chatsData) {
                const sortedChats = Object.values(chatsData).sort((a, b) => b.date - a.date);
                setChats(sortedChats);
            }
        });
        return () => unsubscribe();
    }, [currentUser.uid, firebase, currentUser]);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {chats &&
                    Object.values(chats)?.sort((a, b) => b.date - a.date).map((c) => (
                        <Box
                            key={c.date}
                            sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: '#666', p: 1, gap: 2, cursor: 'pointer' }}
                            onClick={() => handleSelect(c.userInfo)}>
                            <Avatar src={c.userInfo.photoURL} key={'photo'} />
                            <Box sx={{ display: 'grid', gap: 1, alignItems: 'center', width: '100%' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                    <Typography sx={{ color: 'white' }}>
                                        {c.userInfo.displayName}
                                    </Typography>
                                    <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                                        {c.date && convertTimestampToHHMM(c.date.seconds, c.date.nanoseconds)}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                                        {c.lastMessage?.message.length > 10
                                            ? `${c.lastMessage?.message.substring(0, 8)}...`
                                            : c.lastMessage?.message}
                                    </Typography>
                                    {c.unreadcount && c.unreadcount.count !== 0 && (
                                        <Box sx={{ borderRadius: '100px', bgcolor: '#666', height: '20px', width: '20px', placeContent: 'center', display: 'flex' }}>
                                            <Typography sx={{ color: 'whitesmoke' }}>
                                                {c.unreadcount.count}
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        </Box>
                    ))}
            </Box>
        </>
    )
}

export default Chats;
