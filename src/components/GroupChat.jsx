import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Services'
import { Avatar, Box, Typography } from '@mui/material'

const GroupChat = () => {
    const [chats, setChats] = useState([])
    const firebase = useFirebase()
    const currentUser = firebase.currentUser
    useEffect(() => {
        const unsubscribe = firebase.getGroupChats((groupData) => {
            if (groupData) {
                const sortedChats = Object.values(groupData).sort((a, b) => b.date - a.date);
                setChats(sortedChats);
                // console.log(groupData)
            }
        });
        return () => unsubscribe();
    }, [currentUser.uid, firebase, currentUser]);
    const handleSelect = (groupInfo) => {
        firebase.handleGroupChange(groupInfo)
    };
    const convertTimestampToHHMM = (timestampSeconds, timestampNanoseconds) => {
        const timestampMillis = timestampSeconds * 1000 + Math.round(timestampNanoseconds / 1e6);
        const date = new Date(timestampMillis);

        const formattedTime = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        }).format(date);

        return formattedTime;
    }
    const convertTimestampToDate = (timestampSeconds, timestampNanoseconds) => {
        const timestampMillis = timestampSeconds * 1000 + Math.round(timestampNanoseconds / 1e6);
        const date = new Date(timestampMillis);

        const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedDate = dateFormat.format(date);

        return formattedDate;
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', overflowX: 'clip' }}>
                {chats &&
                    Object.values(chats).map((c) => (
                        <Box
                            key={c.date}
                            sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: '#666', p: 1, gap: 2, cursor: 'pointer', overflow: 'hidden' }}
                            onClick={() => handleSelect(c.groupInfo)}>
                            <Avatar src={c.groupInfo.photoURL} key={'photo'} />
                            <Box sx={{ display: 'grid', gap: 1, alignItems: 'center', width: '100%', overflow: 'hidden' }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', overflow: 'auto' }}>
                                    <Typography sx={{ color: 'white' }}>
                                        {c.groupInfo.displayName}
                                    </Typography>
                                    <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                                        {c.date && convertTimestampToHHMM(c.date.seconds, c.date.nanoseconds)}
                                    </Typography>
                                    {/* <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                                        {c.date && convertTimestampToDate(c.date.seconds, c.date.nanoseconds)}
                                    </Typography> */}
                                </Box>
                                <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                                    {c.lastMessage?.message.length > 3
                                        ? `${c.lastMessage?.message.substring(0, 3)}...`
                                        : c.lastMessage?.message}
                                </Typography>

                            </Box>
                        </Box>
                    ))}
            </Box>
        </>
    )
}

export default GroupChat