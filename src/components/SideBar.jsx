import { Avatar, Box, Button, Divider, IconButton, Input, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useFirebase } from '../context/Services';
import Search from './Search';
import Chats from './Chats';
import { useNavigate } from 'react-router-dom';
const Sidebar = () => {
    const firebase = useFirebase()
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState('')
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [groupName, setGroupName] = useState('')
    const [groupImage, setGroupImage] = useState('')
    const [setLoading, setSetLoading] = useState(false)
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const currentUser = firebase.currentUser
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleButtonClick = () => {
        setPopupOpen(true);
        setAnchorEl(null)
    };
    const createGroup = () => {
      
        firebase.createGroup(groupName,groupImage)
        setPopupOpen(false);
       };
    const onFileChange = e => {
        setGroupImage(e.target.files[0]);
        e.preventDefault();
    }
    const myGroups = () => {
        navigate('/groups')
        setPopupOpen(false)
    }
    return (
        <>
            {
                currentUser &&
                <Box sx={{ width: 1 / 6, display: 'grid', height: '100vh', bgcolor: '#141414', p: 1, alignContent: 'start' }}>
                    <Box sx={{ display: 'flex', width: '100%', pt: 1, maxWidth: '100%', maxHeight: '100%', height: 'fit-content', alignItems: 'center', placeContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Typography sx={{ height: '100%', color: 'white' }}>
                                {currentUser.displayName}
                            </Typography>
                            <Avatar src={currentUser.photoURL} sx={{ height: '28px', width: '28px' }} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton onClick={handleClick}>
                                <MoreVertOutlinedIcon sx={{ color: 'white', height: '28px', width: '28px' }}
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined} />
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
                            <MenuItem onClick={handleButtonClick}>Create Group</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={myGroups}>My Groups</MenuItem>
                            <MenuItem onClick={() => { firebase.logOut() }}>Logout</MenuItem>
                        </Menu>
                    </Box>
                    <Divider sx={{ color: '#666', borderTop: 1 }} />
                    {isPopupOpen && (
                        <Box sx={{ display: 'flex', alignItems: 'center', height: '70px', width: '100%', bgcolor: 'transparent' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Input placeholder='enter group name' sx={{ color: 'white' }}
                                    value={groupName}
                                    type='text'
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                                <Input placeholder='enter group name' sx={{ color: 'white' }}
                                    type='file'
                                    onChange={onFileChange}
                                />
                            </Box>
                            <Button sx={{ color: '#999' }} onClick={createGroup}>create</Button>
                        </Box>
                    )}
                    <Search />
                    <Chats />
                </Box>
            }
        </>
    )
}

export default Sidebar