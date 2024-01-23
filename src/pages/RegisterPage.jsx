import { Avatar, Box, Button, Container, CssBaseline, Grid, Input, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { images } from '../assets/images';
import { useFirebase } from '../context/Services';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [image, setImage] = useState([])

    const firebase = useFirebase()
    const navigate = useNavigate()

    const handleSignUp = (e) => {
        e.preventDefault()
        firebase.registerWithEmailAndPassword(email, password, displayName, image)
        setEmail('')
        setPassword('')
        setDisplayName('')
        setImage('')

    }
    const onFileChange = e => {
        setImage(e.target.files[0]);
        e.preventDefault();
    }
    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/');
        }
    }, [firebase, navigate]);
    return (
        <>
            <Box sx={{ height: '100%', backgroundImage: `url(${images.loginBG})`, backgroundSize: '100%', display: 'flex', alignItems: 'center', placeContent: 'center', padding: 5, pb: 10 }}>
                <Container component="main" maxWidth="xs" sx={{ p: 3, border: 1, borderColor: '#666', borderRadius: '12px', backdropFilter: 'blur(3px)' }}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" noValidate sx={{ mt: 3, display: 'grid' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="name"
                                        label="name"
                                        name="name"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Input
                                        required
                                        fullWidth
                                        id="userimage"
                                        label="image"
                                        type='file'
                                        onChange={onFileChange}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, placeSelf: 'center' }}
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href='/login' variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default RegisterPage