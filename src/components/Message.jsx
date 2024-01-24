import { Avatar, Box, Typography } from '@mui/material';
import React from 'react';
import { useFirebase } from '../context/Services';


const Message = ({ msg }) => {
  const firebase = useFirebase();
  const currentUser = firebase.currentUser;
  const data = firebase.contextData;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          height: 'fit-content',
        }}
      >
        {
          msg &&
            msg.senderId === currentUser.uid ? (
            <Box sx={{
              display: 'flex',
              width: 'fit-content',
              mr: 2,
              ml: 'auto',
              p: 1,
              gap: 1,
              alignItems: 'center',
              height:'fit-content'

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
                  height:'fit-content'
                }}
              >
                <Box sx={{ display: 'grid' }}>
                  <Typography sx={{ color: 'white', fontSize: '12px',textAlign:'end' }}>
                    {currentUser.displayName}
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: '16px' }}>
                    {msg.message}
                  </Typography>
                </Box>
              </Box>
              <Avatar
                src={
                  msg.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                sx={{ height: '35px', width: '35px' }}
              />
            </Box>
          ) : (
            <Box sx={{
              display: 'flex',
              width: 'fit-content',
              ml: 2,
              mr: 'auto',
              p: 1,
              gap: 1,
              alignItems: 'center',
            }}>
              <Avatar
                src={
                  msg.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                sx={{ height: '35px', width: '35px' }}
              />
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
                <Box sx={{ display: 'grid' }}>
                <Typography sx={{ color: 'white', fontSize: '12px' }}>
                    {data.user.displayName}
                  </Typography>
                  <Typography sx={{ color: 'white', fontSize: '16px' }}>
                    {msg.message}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )
        }
      </Box >
    </>
  );
};

export default Message;
