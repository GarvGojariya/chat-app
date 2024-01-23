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
        firebase.getMessage().then((msgs) => setMessageList(msgs));
        setMessages(messageList.messages)
    }, [data.chatId, messageList,firebase])
    return (
        <>
            <Box sx={{overflow:'auto',height:'80vh',display:'grid',gap:1,mt:1}}>
                {messages &&
                messages.map((m) =>
                    <Message msg={m} key={m.id} />
                )
                }
            </Box>
        </>
    )
}

export default Messages