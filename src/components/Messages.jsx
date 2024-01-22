import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Services'
import Message from './Message'

const Messages = () => {
    const firebase = useFirebase()
    const [messageList, setMessageList] = useState([])
    const data = firebase.contextData

    useEffect(() => {
        firebase.getMessage().then((msgs) => setMessageList(msgs));
    }, [data.chatId, messageList])
    return (
        <>
            {Object.values(messageList).map((m) =>
                <Message msg={m} key={m.id} />
            )
            }
        </>
    )
}

export default Messages