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
            <Box
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
                borderTopLeftRadius: '12px',maxWidth:'80%' 
              }}
            >
              <Box sx={{ display: 'grid' }}>
                <Typography sx={{ color: 'white', fontSize: '16px'}}>
                  {msg.message}
                </Typography>
                <Typography sx={{color:'white',fontSize:'10px'}}>
                  {/* <Moment format="hh:mm"> */}
                  {/* {console.log(msg)} */}
                  {/* </Moment> */}
                </Typography>
              </Box>
              <Avatar
                src={
                  msg.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                sx={{ height: '20px', width: '20px' }}
              />
            </Box>
          ) : (
            <Box
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
                borderTopRightRadius: '12px',maxWidth:'80%' 
              }}
            >
              <Avatar
                src={
                  msg.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                sx={{ height: '20px', width: '20px' }}
              />
              <Box sx={{ display: 'grid' }}>
              
                <Typography sx={{ color: 'white', fontSize: '16px' }}>
                  {msg.message}
                </Typography>
              </Box>
            </Box>
          )
        // ))
        }
      </Box>
    </>
  );
};

export default Message;
