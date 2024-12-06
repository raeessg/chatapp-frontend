import React, { useState } from 'react'
import { AppBar, Avatar, Box, Button, Container, formControlClasses, IconButton, Paper, Stack, TextField, Toolbar, Tooltip, Typography } from '@mui/material'
import { ArrowBack as ArrowBackIcon, CameraAlt as CameraAltIcon } from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/styles/styleComponents';
import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';
import { usernameValidator } from '../utils/validators';
import axios from 'axios';
import { server } from '../constants/config';
import { useDispatch } from 'react-redux';
import { userExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';
import { assets } from '../assets/assets';
import { Link, useLocation } from 'react-router-dom';



function login() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();

    const toggleLogin = () => setIsLogin((prev => !prev));

    // Initialize the hook with a rule (for example, the field cannot be empty)
    const name = useInputValidation("");
    const bio = useInputValidation("");
    const username = useInputValidation("", usernameValidator);
    const password = useStrongPassword();

    const avatar = useFileHandler("single")

    const dispatch = useDispatch();

    // LogIn
    const handleLogin = async (e) => {
        e.preventDefault();

        const toastId = toast.loading('Wait...');


        setIsLoading(true)

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const { data } = await axios.post(`${server}/api/v1/user/login`, {
                username: username.value,
                password: password.value,
            },
                config
            );
            dispatch(userExists(data.user));
            toast.success(data.message, { id: toastId, })
        }
        catch (error) {

            const message = error.response?.data?.message || "Something went wrong";
            toast.error(String(message), { id: toastId });
        }
        finally {
            setIsLoading(false)
        }
    }

    // Sign up
    const handleSignUp = async (e) => {
        e.preventDefault();

        const toastId = toast.loading('Wait...');

        setIsLoading(true)

        const formData = new FormData();
        formData.append("avatar", avatar.file);
        formData.append("name", name.value);
        formData.append("bio", bio.value);
        formData.append("username", username.value);
        formData.append("password", password.value);

        const config = {
            withCredentials: true,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        try {
            const { data } = await axios.post(`${server}/api/v1/user/new`,
                formData,
                config,
            )
            // dispatch(userExists(true));
            dispatch(userExists(data.user));
            toast.success(data.message, {
                id: toastId
            });
        } catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(String(message), { id: toastId });
        }
        finally {
            setIsLoading(false)
        }

    }

    return (

        <div
            style={{
                background: 'rgba(0, 0, 0, 1)',
                backgroundImage: `url(${assets.bg_login1})`,
                backgroundSize: 'cover',
                // backgroundPosition: 'center',
                // backgroundRepeat: 'no-repeat',
                // height: '100vh',
                width: '100%',

            }}
        >

            {/* <AppBar position='static' sx={{ bgcolor: 'rgba(0,0,0,0.8)' }}>
                <Toolbar>

                    <Typography sx={{
                        fontSize: '1.8rem', display: { sm: 'block' }
                    }}>
                        <span style={{
                            fontWeight: '600',
                            fontSize: '2rem',
                            background: 'linear-gradient(16deg, #4b90ff, #ff5546)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            T
                        </span>
                        alk
                        <span
                            style={{
                                fontWeight: '600',
                                fontSize: '2rem',
                                background: 'linear-gradient(16deg, #4b90ff, #ff5546)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            S
                        </span>
                        ync
                        <img style={{
                            margin: '0 0 8px 5px', width: '2rem', filter: 'invert(15%) sepia(0%) saturate(107%) hue-rotate(130deg) brightness(95%) contrast(80%)'
                        }}
                            src={assets.chat_icon2} alt="" />
                    </Typography>

                    <Box sx={{ position: 'absolute', right: '1rem', }}>

                        <Button sx={{ width: '5rem', color: 'white', bgcolor: 'rgba(0,0,0,0.1)', backdropFilter: 'blur(5px)', border: '0.5px solid gray', borderRadius: '0.5rem' }} variant='text' onClick={toggleLogin} disabled={isLoading}>SignUp</Button>

                    </Box>

                </Toolbar>
            </AppBar> */}


            <Container component={"main"} maxWidth="xs"
                sx={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >

                <Paper
                    elevation={3}
                    sx={{
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        border: '1px solid black',
                        borderRadius: '1rem',
                        color: 'white',
                        // height: '100vh',
                        // background: 'rgba(0, 0, 0, 0.5)',

                        backgroundColor: 'rgba(0,0,0,0.2)', // Transparent background color
                        backdropFilter: 'blur(3px)', // Apply blur effect
                    }}
                >

                    {isLogin ? (
                        <Box> {/* <> </> This Symbole is known as fargments*/}
                            {/* <img src={assets.chat_icon2} /> */}
                            <Typography color='white' variant='h4' textAlign={'center'}>Login</Typography>
                            <form
                                style={{
                                    marginTop: '1rem',
                                    // backgroundColor: 'red'
                                }}
                                onSubmit={handleLogin}

                            >
                                <TextField
                                    required
                                    fullWidth
                                    label="Username"
                                    margin='normal'
                                    variant='outlined'
                                    value={username.value}
                                    onChange={username.changeHandler}
                                    sx={{
                                        border: 'none',
                                        borderBottom: '1px solid gray',
                                        outline: "none",
                                        input: { color: 'white' },
                                        label: { color: 'white' },
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: "12px", // Adjust the border radius
                                            "& fieldset": {
                                                borderRadius: "0.5rem",
                                                border: 'none',
                                                label: { color: 'white' },

                                            },
                                        },
                                    }}
                                />
                                <TextField
                                    required
                                    fullWidth
                                    label="Password"
                                    type='password'
                                    margin='normal'
                                    variant='outlined'
                                    value={password.value}
                                    onChange={password.changeHandler}
                                    sx={{
                                        border: 'none',
                                        borderBottom: '1px solid gray',
                                        outline: "none",
                                        // border: '1px solid gray',
                                        // borderRadius: '1rem',
                                        input: { color: 'white' },
                                        label: { color: 'white' },
                                        "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                                border: 'none',

                                            },
                                        },
                                    }}
                                />

                                <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth disabled={isLoading}>Login</Button>

                                <Typography textAlign={'center'} marginTop={'1rem'}>OR</Typography>
                                <Button fullWidth variant='text' onClick={toggleLogin} disabled={isLoading}>Sign up</Button>
                            </form>
                        </Box>

                    ) : (


                        // Sign Up 
                        <> {/* This Symbole is known as fargments*/}
                            <ArrowBackIcon title={'Back'} sx={{position: 'absolute', top: '15px', left: '15px' ,cursor: 'pointer', }} onClick={toggleLogin} disabled={isLoading} />
                            {/* <Tooltip title='back' disabled={isLoading} /><IconButton onClick={toggleLogin} ><ArrowBackIcon /></IconButton>  <Tooltip /> */}
                    <Typography variant='h4' textAlign={'center'}>Sign Up</Typography>
                    <form
                        style={{
                            width: '100%',
                            // height: '100vh'
                            // marginTop: '1rem',
                        }}

                        onSubmit={handleSignUp}
                    >
                        <Stack position={'relative'} width={'10rem'} margin={'auto'}>

                            <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.4)', border: '2px solid blue ', width: '10rem', height: '10rem', objectFit: 'contain' }} src={avatar.preview} />

                            <IconButton sx={{ position: 'absolute', bottom: '0', right: '1.8rem', color: 'white', backgroundColor: 'white', bgcolor: 'rgba(0,0,0,0.5)', ':hover': { bgcolor: 'rgba(0,0,0,0.7)' } }} component='label'>
                                <>
                                    <CameraAltIcon />
                                    <VisuallyHiddenInput type='file' onChange={avatar.changeHandler} />
                                </>
                            </IconButton>
                        </Stack>

                        {
                            avatar.error && (
                                <Typography m={'1rem auto'} width={'fit-content'} display={'block'} color={'error'} variant='caption'>
                                    {avatar.error}
                                </Typography>
                            )
                        }


                        <TextField
                            required
                            fullWidth
                            label="Name"
                            margin='normal'
                            variant='outlined'
                            value={name.value}
                            onChange={name.changeHandler}
                            sx={{
                                border: 'none',
                                borderBottom: '1px solid gray',
                                outline: "none",
                                // border: '1px solid gray',
                                // borderRadius: '1rem',
                                input: { color: 'white' },
                                label: { color: 'white' },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: 'none',

                                    },
                                },
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Bio"
                            margin='normal'
                            variant='outlined'
                            value={bio.value}
                            onChange={bio.changeHandler}
                            sx={{
                                border: 'none',
                                borderBottom: '1px solid gray',
                                outline: "none",
                                // border: '1px solid gray',
                                // borderRadius: '1rem',
                                input: { color: 'white' },
                                label: { color: 'white' },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: 'none',

                                    },
                                },
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Username"
                            margin='normal'
                            variant='outlined'
                            value={username.value}
                            onChange={username.changeHandler}
                            sx={{
                                border: 'none',
                                borderBottom: '1px solid gray',
                                outline: "none",
                                // border: '1px solid gray',
                                // borderRadius: '1rem',
                                input: { color: 'white' },
                                label: { color: 'white' },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: 'none',

                                    },
                                },
                            }}
                        />

                        {
                            username.error && (
                                <Typography color='error' variant='caption'>
                                    {username.error}
                                </Typography>
                            )
                        }

                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type='password'
                            margin='normal'
                            variant='outlined'
                            value={password.value}
                            onChange={password.changeHandler}
                            sx={{
                                border: 'none',
                                borderBottom: '1px solid gray',
                                outline: "none",
                                // border: '1px solid gray',
                                // borderRadius: '1rem',
                                input: { color: 'white' },
                                label: { color: 'white' },
                                "& .MuiOutlinedInput-root": {
                                    "& fieldset": {
                                        border: 'none',

                                    },
                                },
                            }}
                        />

                        {
                            password.error && (
                                <Typography color='error' variant='caption'>
                                    {password.error}
                                </Typography>
                            )
                        }

                        <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth disabled={isLoading}>Sign Up</Button>

                        {/* <Typography textAlign={'center'} margin={'1rem'}>OR</Typography> */}
                        {/* <Button sx={{ width: '0', height: '0' }} variant='text' onClick={toggleLogin} disabled={isLoading}>Login</Button> */}
                    </form>
                </>
                    )}
            </Paper>
        </Container>
        </div >
    )
}

export default login

