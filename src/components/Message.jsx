import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useFirebase } from '../context/Services';


const Message = ({ msg }) => {
  const firebase = useFirebase();
  const currentUser = firebase.currentUser;
  const data = firebase.contextData;

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
  const handleReadUnread = (senderId,id) =>{
      firebase.handleReadUnread(senderId,id)
      console.log(id)
  }
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          height: 'fit-content',
          maxHeight: 'fit-content'
        }}
      >
        {
          msg &&
            msg.senderId === currentUser.uid ? (
            <Box sx={{
              display: 'grid',
              width: 'fit-content',
              mr: 2,
              ml: 'auto',
              p: 1,
              gap: 1,
              alignItems: 'center',
              height: 'fit-content'
            }}>
              <Box
                sx={{
                  bgcolor: '#141414',
                  display: 'flex',
                  width: 'fit-content',
                  p: 1,
                  alignItems: 'center',
                  borderBottomLeftRadius: '12px',
                  borderBottomRightRadius: '12px',
                  borderTopLeftRadius: '12px', maxWidth: '80%',
                  height: 'fit-content'
                }}
              >
                <Box sx={{ display: 'grid',cursor:'pointer' }} onClick={()=>handleReadUnread(msg.senderId,msg.id)}>
                  <Typography sx={{ color: '#c4bdbc', fontSize: '12px', textAlign: 'end' }}>
                    {currentUser.displayName}
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: '16px' }}>
                    {msg.message}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ color: '#141414', justifySelf: 'right', fontSize: '10px' }}>
                {convertTimestampToHHMM(msg.date.seconds, msg.date.nanoseconds)}
              </Typography>
            </Box>
          ) : (
            <Box sx={{
              display: 'grid',
              width: 'fit-content',
              ml: 2,
              mr: 'auto',
              p: 1,
              gap: 1,
              alignItems: 'center',
            }}>
              <Box
                sx={{
                  bgcolor: '#141414',
                  display: 'flex',
                  width: 'fit-content',
                  p: 1,
                  alignItems: 'center',
                  borderBottomLeftRadius: '12px',
                  borderBottomRightRadius: '12px',
                  borderTopRightRadius: '12px', maxWidth: '80%'
                }}
              >
                <Box sx={{ display: 'grid',cursor:'pointer' }}onClick={()=>handleReadUnread(msg.senderId,msg.id)}>
                  <Typography sx={{ color: '#c4bdbc', fontSize: '12px' }}>
                    {data.user.displayName}
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: '16px' }}>
                    {msg.message}
                  </Typography>
                </Box>
              </Box>
              {/* console.log(msg.date) */}
              <Typography sx={{ color: '#141414', justifySelf: 'left', fontSize: '10px' }}>
                {/* {convertTimestampToHHMM(msg.date.seconds, msg.date.nanoseconds)} */}
              </Typography>
            </Box>
          )
        }
      </Box >
    </>
  );
};

export default Message;
