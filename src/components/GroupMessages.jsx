import { Box } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import GroupMessage from './GroupMessage';
import { useFirebase } from '../context/Services';

const GroupMessages = () => {
    const firebase = useFirebase();
    const [messageList, setMessageList] = useState([]);
    const [messages, setMessages] = useState([]);
    const data = firebase.groupData;
    const messagesContainerRef =  useRef(null)

    useEffect(() => {
        firebase.getGroupMessages().then((msgs) => {
            setMessageList(msgs);
            setMessages(msgs.messages); 
            scrollToBottom()
        });
    }, [firebase, data?.displayName,messages]);
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };
    return (
        <>
            <Box sx={{ overflow: 'auto', height: '82vh', display: 'flex',flexDirection:'column', gap: 1, mt: 1, bgcolor: '#666', overflowX: 'auto' }} ref={messagesContainerRef}>
                <Box>
                    {messages &&
                        messages.map((m) =>
                            <GroupMessage msg={m} key={m.id} />
                        )
                    }
                </Box>
            </Box>
        </>
    );
}

export default GroupMessages;
