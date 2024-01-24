import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Services'
import Message from './Message'
import { Box } from '@mui/material'

const Messages = () => {
    const firebase = useFirebase()
    const [messageList, setMessageList] = useState([])
    const [messages, setMessages] = useState([])
    const data = firebase.contextData

    useEffect(() => {
        firebase.getMessage().then((msgs) => {
            setMessageList(msgs);
            setMessages(msgs.messages)
        }

        );
    }, [data.chatId, firebase, messages])
    return (
        <>
            <Box sx={{ overflow: 'auto', height: '82vh', display: 'flex',flexDirection:'column', mt: 1, bgcolor: '#666', overflowX: 'auto' }}>
                {messages &&
                    messages.map((m) =>
                        <Box sx={{height:'fit-content'}}>
                            <Message msg={m} key={m.id} />
                        </Box>
                    )
                }
            </Box>
        </>
    )
}

export default Messages