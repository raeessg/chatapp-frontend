import { Box, Drawer, Grid, IconButton, Menu, Stack, styled, Typography } from '@mui/material'
import { Chat as MesssageIcon, Close as CloseIcon, Groups as GroupsIcon, ManageAccounts as ManageAccountsIcon, Menu as MenuIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'
import React, { useState } from 'react'
import { Link as LinkComponent, Navigate, useLocation } from 'react-router-dom'
import { Dashboard as DashboardIcon } from "@mui/icons-material"


const Link = styled(LinkComponent)`
text-decoration : none;
border-radius: 2rem;
padding: 1rem 2rem;
color: white;
&:hover {
border: 1px solid red
}
`;//color: rgba(0, 0, 0, 0.54);

export const adminTabs = [{
    name: 'Dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon />
},
{
    name: 'Users',
    path: '/admin/users',
    icon: <ManageAccountsIcon />
},
{
    name: 'Chats',
    path: '/admin/Chats',
    icon: <GroupsIcon />
},
{
    name: 'Messages',
    path: '/admin/messages',
    icon: <MesssageIcon />
}
]

const Sidebar = ({ bg = 'black', w = '100%' }) => {
    const location = useLocation();

    const logoutHandler = () => {

    }

    return (
        <Stack
            width={'24rem'}
            height={'100vh'}
            direction={'column'}
            p={'3rem'}
            spacing={'3rem'}
            bgcolor={bg}
            position={'fixed'}
            // overflow={'hidden'}
            borderRight={'1px solid red'}
        >
            <Typography color='white' variant='h5' textTransform={'uppercase'}>
                Messanger
            </Typography>

            <Stack spacing={'1rem'} >
                {adminTabs.map((tab) => (
                    <Link
                        key={tab.path}
                        to={tab.path}
                        sx={
                            location.pathname === tab.path && {

                                border: '1px solid red',
                                // ":hover": { color: 'red' }
                            }
                        }
                    >
                        <Stack color={'white'} direction={'row'} alignItems={'center'} spacing={'1rem'}>
                            {tab.icon}
                            <Typography fontSize={'1rem'}>{tab.name}</Typography>
                        </Stack>
                    </Link>
                ))}


                <Link
                    onClick={logoutHandler}
                >
                    <Stack color={'white'} direction={'row'} alignItems={'center'} spacing={'1rem'}>
                        <ExitToAppIcon />
                        <Typography fontSize={'1rem'}>Logout</Typography>
                    </Stack>
                </Link>
            </Stack>

        </Stack>
    )
}


const isAdmin = true;
const AdminLayout = ({ children }) => {
    const [isMobile, setisMobile] = useState(false);

    const handleMobile = () => {
        setisMobile(!isMobile)
    };

    const handleClose = () => {

        setisMobile(false)
    }

    if (!isAdmin) return <Navigate to={'/admin'} />

    return (

        <Grid container minHeight={'100vh'} color={'white'}>

            <Box sx={{
                display: { xs: 'block', md: 'none' },
                position: 'fixed',
                right: '1rem',
                top: '1rem',
            }}>
                <IconButton onClick={handleMobile}>
                    {isMobile ? <CloseIcon sx={{ color: 'white' }} /> : <MenuIcon sx={{ color: 'white' }} />}
                </IconButton>
            </Box>

            <Grid item md={4} lg={3} sx={{
                display: { xs: 'none', md: 'block' }
            }}>
                <Sidebar />
            </Grid>

            <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: 'black' }}>
                {children}
            </Grid>

            <Drawer open={isMobile} onClose={handleClose}>

                <Sidebar w='50vw' />
            </Drawer>

        </Grid>
    )
}

export default AdminLayout
