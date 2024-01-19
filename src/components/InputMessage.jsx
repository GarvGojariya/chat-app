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
            <Box sx={{ display: 'flex' }}>
                <Input placeholder='enter message to send' value={message} onChange={(e)=>setMessage(e.target.value)} />
                <IconButton onClick={handleSend}>
                    <SendIcon />
                </IconButton>
            </Box>
        </>
    )
}

export default InputMessage