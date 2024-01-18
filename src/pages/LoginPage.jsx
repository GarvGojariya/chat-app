import { Avatar, Box, Button, Container, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { images } from '../assets/images'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFirebase } from '../context/Services';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const firebase = useFirebase()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        firebase.loginWithEmailAndPassword(email, password);
        setEmail('')
        setPassword('')

    }
    useEffect(() => {
        if (firebase.isLoggedIn) {
            navigate('/');
        }
    }, [firebase, navigate]);
    return (
        <>
            <Box sx={{ height: '100vh', backgroundImage: `url(${images.loginBG})`, backgroundSize: '100%', display: 'flex', alignItems: 'center', placeContent: 'center', padding: 5,  }}>
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
                            Log in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleLogin} sx={{ mt: 3, display: 'grid' }}>
                            <Grid container spacing={2}>
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
                            </Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ mt: 3, mb: 2, placeSelf: 'center' }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href='/register' variant="body2">
                                        Don't have an account? Sign up
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

export default LoginPage