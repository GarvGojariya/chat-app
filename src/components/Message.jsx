import { Avatar, Box, Typography } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useFirebase } from '../context/Services';

const Message = ({ msg }) => {
  const ref = useRef();
  const firebase = useFirebase();
  const currentUser = firebase.currentUser;
  const data = firebase.contextData;

  useEffect(() => {
    // Scroll to the bottom when a new message is received or sent
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [msg]);

  return (
    <>
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          overflow: 'auto',
          height: '85vh',
        }}
      >
        {msg.map((ms, index) => (
          ms.senderId === currentUser.uid ? (
            <Box
              key={index}
              sx={{
                bgcolor: '#141414',
                display: 'flex',
                width: 'fit-content',
                mr: 2,
                ml: 'auto',
                p: 1,
                gap: 1,
                alignItems: 'center',
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                borderTopLeftRadius: '12px',
              }}
            >
              <Box sx={{ display: 'grid' }}>
                <Typography sx={{ color: 'white', fontSize: '16px' }}>
                  {ms.message}
                </Typography>
              </Box>
              <Avatar
                src={
                  ms.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                sx={{ height: '20px', width: '20px' }}
              />
            </Box>
          ) : (
            <Box
              key={index}
              sx={{
                bgcolor: '#141414',
                display: 'flex',
                width: 'fit-content',
                mr: 'auto',
                ml: 2,
                alignItems: 'center',
                p: 1,
                gap: 1,
                borderBottomLeftRadius: '12px',
                borderBottomRightRadius: '12px',
                borderTopRightRadius: '12px',
              }}
            >
              <Avatar
                src={
                  ms.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                sx={{ height: '20px', width: '20px' }}
              />
              <Box sx={{ display: 'grid' }}>
                <Typography sx={{ color: 'white', fontSize: '16px' }}>
                  {ms.message}
                </Typography>
              </Box>
            </Box>
          )
        ))}
      </Box>
    </>
  );
};

export default Message;
