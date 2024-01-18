import { Box, Divider, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import React, { useState } from 'react'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import { useFirebase } from '../context/Services';
const SideBar = () => {
    const firebase = useFirebase()
    const [anchorEl, setAnchorEl] = useState('')
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <>
            <Box sx={{ width: 1 / 6, display: 'grid', height: '100vh', bgcolor: '#141414', p: 1, alignContent: 'start' }}>
                <Box sx={{ display: 'flex', width: '100%', maxWidth: '100%', maxHeight: '100%', height: 'fit-content', alignItems: 'center', placeContent: 'space-between' }}>
                    <Typography sx={{ height: '100%', color: 'white' }}>
                        Chats
                    </Typography>
                    <IconButton>
                        <MoreVertOutlinedIcon sx={{ color: 'white' }}
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick} />
                    </IconButton>
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
                        <MenuItem onClick={()=>{firebase.logOut()}}>Logout</MenuItem>
                    </Menu>
                </Box>
                <Divider sx={{ color: '#666', borderTop: 1 }} />

            </Box>
        </>
    )
}

export default SideBar