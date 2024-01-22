import React from 'react'
import { useFirebase } from '../context/Services'
import Sidebar from '../components/Sidebar'
import InputMessage from '../components/InputMessage'
import { Box } from '@mui/material'

const ChatPage = () => {
    const firebase = useFirebase()
    return (
        <>
            <Box sx={{display:'flex',alignItems:'end'}}>
                <Sidebar />
                <InputMessage sx={{}} />
            </Box>

        </>
    )
}

export default ChatPage