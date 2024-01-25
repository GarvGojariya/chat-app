import { Avatar, Box, Input, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useFirebase } from '../context/Services'

const Search = () => {
  const [userName, setUsername] = useState('')
  const firebase = useFirebase()
  const [chatUser,setChatUSer] = useState(null)
  // const [isSelect, setIsSelect] = useState(false)
  const handleSearch = () => {
    firebase.findUser(userName);
    setChatUSer(firebase.chatUser)
  }
  const handleSelect = () => {
    // setIsSelect(true)
    firebase.selectUser();
    setUsername("")
    setChatUSer(null)
  }

  return (
    <>
      <Box>
        <Input placeholder='search' value={userName} onKeyDown={e => e.key === 'Enter' ? handleSearch() : ''} onChange={(e) => setUsername(e.target.value)}
          sx={{ color: 'white' }}
        ></Input>
      </Box>
      {chatUser && (
        <Box onClick={handleSelect} sx={{ cursor:'pointer',display: 'flex', p: 2, alignItems: 'center', bgcolor: '#262626', gap: 2 }}>
          {chatUser.photoURL && <Avatar src={chatUser.photoURL} />}
          <Box>
            <Typography sx={{ color: '#999' }}>{chatUser.displayName}</Typography>
          </Box>
        </Box>
      )}
    </>
  )
}

export default Search