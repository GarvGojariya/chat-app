import React from 'react'
import SideBar from '../components/SideBar'
import { Button } from '@mui/material'
import { useFirebase } from '../context/Services'

const ChatPage = () => {
    const firebase = useFirebase()
    return (
        <>
            <SideBar />

        </>
    )
}

export default ChatPage