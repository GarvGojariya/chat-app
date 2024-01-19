import { Avatar, Box, Typography } from '@mui/material'
import { orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Services'


const Chats = () => {
    const [chats, setChats] = useState([])

    const firebase = useFirebase()
    const currentUser = firebase.currentUser
  
    useEffect(() => {
        firebase.getChats().then((chatsData) => setChats(chatsData));
    }, [currentUser.uid])
// console.log(chats)
    return (
        <>
            <Box sx={{display:'flex', flexDirection:'column',gap:1}}>
                { Object.values(chats).map((c) => (
                    <Box  sx={{ display: 'flex', alignItems: 'center' ,borderBottom:1,borderColor:'#666',p:1,gap:2}}>
                        {console.log(c.userInfo)}   
                        {console.log(c.userInfo)}   
                        {/* {console.log(chat.userInfo.displayName)} */}
                        <Avatar src={c.userInfo.photoURL} />
                        <Typography sx={{color:'white'}}>
                            {c.userInfo.displayName}
                        </Typography>  
                    </Box>
                ))}
            </Box>
        </>
    )
}

export default Chats