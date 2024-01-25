import React from 'react'
import { useFirebase } from '../context/Services';
import { Avatar, Box, Typography } from '@mui/material';

const GroupMessage = ({ msg }) => {
    const firebase = useFirebase();
    const currentUser = firebase.currentUser;
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
    const convertTimestampToDate = (timestampSeconds, timestampNanoseconds) => {
        const timestampMillis = timestampSeconds * 1000 + Math.round(timestampNanoseconds / 1e6);
        const date = new Date(timestampMillis);

        const dateFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const formattedDate = dateFormat.format(date);

        return formattedDate;
    }
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    rowGap: 2,
                    height: 'fit-content',
                    maxHeight: 'fit-content',
                }}
            >
                {
                    msg &&
                        msg.senderId === currentUser.uid ? (
                        <Box sx={{
                            display:'grid',
                            width: 'fit-content',
                            ml: 'auto',
                            p: 1,
                            gap: 1,
                            maxWidth:'fit-content',
                            mr:2
                        }}>
                            <Box
                                sx={{
                                    bgcolor: '#141414',
                                    display: 'flex',
                                    width: 'fit-content',
                                    p: 1,
                                    alignItems: 'center',
                                    justifySelf:'end',
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                    borderTopLeftRadius: '12px', maxWidth: '80%'
                                }}
                            >
                                <Box sx={{ display: 'grid',width:'fit-content',maxWidth:'100%',overflowWrap:'anywhere'}}>
                                    <Typography sx={{width:'100%',maxWidth:'100%', color: '#c4bdbc', fontSize: '12px', textAlign: 'end' }}>
                                        {currentUser.displayName}
                                    </Typography>
                                    <Typography sx={{ color: 'white', fontSize: '16px', justifySelf: 'end' }}>
                                        {msg.message}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row',justifySelf:'end' }}>
                                <Typography sx={{ color: '#141414', justifySelf: 'left', fontSize: '10px' }}>
                                    {convertTimestampToHHMM(msg.date.seconds, msg.date.nanoseconds)}
                                </Typography>
                            </Box>
                            {/* <Avatar
                                src={
                                    msg.senderPhotoURL
                                }
                                sx={{ height: '35px', width: '35px' }}
                            /> */}
                        </Box>
                    ) : (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 'fit-content',
                            ml: 2,
                            mr: 'auto',
                            p: 1,
                            gap: 0.5,
                            alignItems: 'center',
                        }}>
                            {/* <Avatar
                                src={
                                    msg.senderPhotoURL
                                }
                                sx={{ height: '35px', width: '35px' }}
                            /> */}
                            <Box
                                sx={{
                                    bgcolor: '#141414',
                                    display: 'flex',
                                    width: 'fit-content',
                                    minWidth: '40px',
                                    p: 1,
                                    alignItems: 'center',
                                    borderBottomLeftRadius: '12px',
                                    borderBottomRightRadius: '12px',
                                    borderTopRightRadius: '12px', maxWidth: '80%'
                                }}
                            >
                                <Box sx={{ display: 'grid' }}>
                                    <Typography sx={{ color: '#c4bdbc', fontSize: '12px' }}>
                                        {msg.senderName}
                                    </Typography>
                                    <Typography sx={{ color: 'white', fontSize: '16px' }}>
                                        {msg.message}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                <Typography sx={{ color: '#141414', justifySelf: 'left', fontSize: '10px' }}>
                                    {convertTimestampToHHMM(msg.date.seconds, msg.date.nanoseconds)}
                                </Typography>
                                {/* <Typography sx={{ color: 'gray', fontSize: '12px' }}>
                                    {msg.date && convertTimestampToDate(msg.date.seconds, msg.date.nanoseconds)}
                                </Typography> */}
                            </Box>
                        </Box>
                    )
                }
            </Box >
        </>
    )
}

export default GroupMessage