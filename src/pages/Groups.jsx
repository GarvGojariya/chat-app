import React, { useState } from 'react'
import GroupChat from '../components/GroupChat';
import { Avatar, Box, Button, Divider, IconButton, Input, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useFirebase } from '../context/Services';
import InputGroupMessage from '../components/InputGroupMessage';
import GroupMessages from '../components/GroupMessages';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
const Groups = () => {
    const [anchorEl, setAnchorEl] = useState('')
    const [groupName, setGroupName] = useState('')
    const [groupImage, setGroupImage] = useState('')
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [isAddBoxOpen, setisAddBoxOpen] = useState(false);
    const [member, setMember] = useState('')
    const firebase = useFirebase()
    const data = firebase.groupData
    const open = Boolean(anchorEl);
    const navigate = useNavigate()
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const currentUser = firebase.currentUser
    const handleButtonClick = () => {
        setPopupOpen(true);
        setAnchorEl(null)
    };
    const createGroup = () => {
        firebase.createGroup(groupName,groupImage)
        setPopupOpen(false);
    };
    const handleAddClick = () => {
        setisAddBoxOpen(true)
    }
    const addMembers = async () => {
        await firebase.addGroupMembers(member)
        setisAddBoxOpen(false)
        setMember('')
    }
    const onFileChange = e => {
        setGroupImage(e.target.files[0]);
        e.preventDefault();
    }
    const goChats = () =>{
        handleClose();
        navigate('/')
    }
    return (
        <>
            {
                currentUser &&
                <Box sx={{ display: 'flex', position: 'relative', height: '100vh' }}>
                    <Box sx={{ width: 1 / 6, display: 'grid', bgcolor: '#141414', p: 1, alignContent: 'start' }}>
                        <Box sx={{ display: 'flex', width: '100%', pt: 1, maxWidth: '100%', maxHeight: '100%', height: 'fit-content', alignItems: 'center', placeContent: 'space-between', position: 'relative' }}>
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
                                <MenuItem onClick={goChats}>chats</MenuItem>
                                <MenuItem onClick={handleButtonClick}>Create Group</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={() => { firebase.logOut() }}>Logout</MenuItem>
                            </Menu>
                        </Box>
                        <Divider sx={{ color: '#666', borderTop: 1 }} />
                        < GroupChat />
                    </Box>
                    <Box sx={{ width: '100%', height: '100vh', display: 'grid' }}>
                        <Box sx={{ bgcolor: '#262626', display: 'flex', top: 0, gap: 1, position: 'relative', height: 'fit-content', alignItems: 'center' }}>
                            <Avatar sx={{ mt: 1, mb: 1 }} src={data.photoURL}/>
                            <Typography color="white">{data.displayName}</Typography>
                            <IconButton onClick={handleAddClick}>
                                <AddCircleOutlineIcon sx={{ color: '#999' }} />
                            </IconButton>
                            {
                                isAddBoxOpen && (
                                    <Box sx={{ display: 'flex' }}>
                                        <Input placeholder='enter user name ' sx={{ color: 'white' }}
                                            value={member}
                                            onChange={(e) => setMember(e.target.value)}
                                        />
                                        <Button onClick={addMembers} sx={{ color: '#999' }}>add</Button>
                                    </Box>
                                )
                            }
                        </Box>
                        {isPopupOpen && (
                            <Box sx={{ display: 'flex', alignItems: 'center', height: '70px',bgcolor:'#666'  }}>
                                <Input placeholder='enter group name' sx={{ color: 'white' }}
                                    value={groupName}
                                    type='text'
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                                <Input placeholder='enter group name' sx={{ color: 'white' }}
                                    type='file'
                                    onChange={onFileChange}
                                />
                                <Button sx={{ color: '#121212' }} onClick={createGroup}>create</Button>
                            </Box>
                        )}
                        <GroupMessages />
                        <InputGroupMessage />
                    </Box>
                </Box>
            }
        </>
    )
}

export default Groups