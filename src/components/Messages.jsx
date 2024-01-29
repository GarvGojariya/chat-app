import React, { useEffect, useState, useRef } from 'react';
import { useFirebase } from '../context/Services';
import Message from './Message';
import { Box } from '@mui/material';

const Messages = () => {
    const firebase = useFirebase();
    const [messageList, setMessageList] = useState([]);
    const [messages, setMessages] = useState([]);
    const data = firebase.contextData;
    const messagesRef = useRef();

    useEffect(() => {
        firebase.getMessage().then((msgs) => {
            setMessageList(msgs);
            setMessages(msgs.messages);
            scrollMessage()
        });
    }, [data.chatId, firebase, messages]);
    useEffect(() => {
        firebase.updateUnread()
    }, [data])
    const scrollMessage = () => {
        messagesRef.current.addEventListener('DOMNodeInserted', event => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
    }
    return (
        <>
            <Box
                ref={messagesRef}
                sx={{
                    overflow: 'auto',
                    height: '82vh',
                    display: 'flex',
                    flexDirection: 'column',
                    mt: 1,
                    bgcolor: '#666',
                    overflowX: 'auto',
                }}
            >
                {messages &&
                    messages.map((m) => (
                        <Box key={m.id} sx={{ height: 'fit-content' }}>
                            <Message msg={m} />
                        </Box>
                    ))}
            </Box>
        </>
    );
};

export default Messages;
