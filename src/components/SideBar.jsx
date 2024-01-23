import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useFirebase } from '../context/Services';
import Search from './Search';
import Chats from './Chats';
const Sidebar = () => {
    const firebase = useFirebase()
    const [anchorEl, setAnchorEl] = useState('')
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const currentUser = firebase.currentUser
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            {
                currentUser &&
                <Box sx={{ width: 1 / 6, display: 'grid', height: '100vh', bgcolor: '#141414', p: 1, alignContent: 'start' }}>
                    <Box sx={{ display: 'flex', width: '100%', maxWidth: '100%', maxHeight: '100%', height: 'fit-content', alignItems: 'center', placeContent: 'space-between' }}>
                        <Typography sx={{ height: '100%', color: 'white' }}>
                            Chats
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar src={currentUser.photoURL} sx={{ height: '28px', width: '28px' }} />
                            <IconButton>
                                <MoreVertOutlinedIcon sx={{ color: 'white', height: '28px', width: '28px' }}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick} />
                            </IconButton>
                        </Box>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={() => { firebase.logOut() }}>Logout</MenuItem>
                        </Menu>
                    </Box>
                    <Divider sx={{ color: '#666', borderTop: 1 }} />
                    <Search />
                    <Chats />
                </Box>}
        </>
    )
}

export default Sidebar