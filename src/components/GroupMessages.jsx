import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import GroupMessage from './GroupMessage';
import { useFirebase } from '../context/Services';

const GroupMessages = () => {
    const firebase = useFirebase();
    const [messageList, setMessageList] = useState([]);
    const [messages, setMessages] = useState([]);
    const data = firebase.groupData;

    useEffect(() => {
        firebase.getGroupMessages().then((msgs) => {
            setMessageList(msgs);
            setMessages(msgs.messages); 
        });
    }, [firebase, data?.displayName,messages]);
    return (
        <>
            <Box sx={{ overflow: 'auto', height: '82vh', display: 'grid', gap: 1, mt: 1, bgcolor: '#666', overflowX: 'auto' }}>
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
