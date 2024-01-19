import React from 'react'
import { useFirebase } from '../context/Services'
import Sidebar from '../components/Sidebar'

const ChatPage = () => {
    const firebase = useFirebase()
    return (
        <>
            <Sidebar />

        </>
    )
}

export default ChatPage