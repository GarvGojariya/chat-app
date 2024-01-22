import { Box, IconButton, Input } from '@mui/material'
import React, { useRef, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { useFirebase } from '../context/Services';
const InputMessage = () => {
    const [message, setMessage] = useState('')
    const firebase = useFirebase()
    const handleSend = ()=>{
        firebase.sendMessage(message);
        setMessage('')
    }
    return (
        <>
            <Box sx={{ display: 'flex',width:'100%',position:'absolute',bottom:0,position:'relative' }}>
                <Input placeholder='enter message to send' value={message} onChange={(e)=>setMessage(e.target.value)}
                sx={{width:'100%'}} onKeyDown={e => e.key === 'Enter' ? handleSend() : ''} />
                <IconButton onClick={handleSend} >
                    <SendIcon  />
                </IconButton>
            </Box>
        </>
    )
}

export default InputMessage