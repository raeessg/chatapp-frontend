import React from 'react'
import { Avatar, Button, Container, IconButton, Paper, Stack, TextField, Typography } from '@mui/material'
import { useInputValidation } from '6pp'
import {Navigate} from 'react-router-dom'


const AdminLogin = () => {

    const isAddmin = true

    const secretkey = useInputValidation('')

    const submitHandler = (e) => {
        e.preventDefault();
    }

    if(isAddmin) return <Navigate to='/admin/dashboard' />

    return (
        <div style={{ backgroundImage: "linear-gradient(rgb(255 255 209), rgb(249 156, 152))" }}>

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
                        alingItems: "center",
                    }}
                >


                    {/* This Symbole is known as fargments*/}
                    <Typography textAlign={'center'} variant='h5'>Admin Login</Typography>
                    <form
                        style={{
                            width: '100%',
                            marginTop: '1rem',
                        }}
                        onSubmit={submitHandler}

                    >
                        <TextField
                            required
                            fullWidth
                            label="Password"
                            type='password'
                            margin='normal'
                            variant='outlined'
                            value={secretkey.value}
                            onChange={secretkey.changeHandler}
                        />

                        <Button sx={{ marginTop: '1rem' }} variant='contained' color='primary' type='submit' fullWidth>Login</Button>
                    </form>


                </Paper>
            </Container>
        </div>
    )
}

export default AdminLogin
