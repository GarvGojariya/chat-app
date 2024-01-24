import React, { useState } from 'react'
import { useFirebase } from '../context/Services'
import { Box, IconButton, Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';

const InputGroupMessage = () => {
    const [message, setMessage] = useState('')
    const firebase = useFirebase()
    const handleSend = async () => {
        if (message.trim() === '') {
            alert('can not send empty message')
        }
        else {
            await firebase.sendGroupMessage(message)
            setMessage('')
        }
        setMessage('')
    }

    return (
        <>
            <Box sx={{ display: 'flex', width: '100%', bottom: 0, position: 'relative',height:'100%' }}>
                <Input placeholder='enter message to send' value={message} onChange={(e) => setMessage(e.target.value)}
                    sx={{ width: '100%' }} onKeyDown={e => e.key === 'Enter' ? handleSend() : ''} />
                <IconButton onClick={handleSend} >
                    <SendIcon />
                </IconButton>
            </Box>
        </>
    )
}

export default InputGroupMessage