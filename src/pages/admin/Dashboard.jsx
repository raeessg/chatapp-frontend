import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Container, Paper, Box, Stack, Typography } from '@mui/material'
import { Chat as MessageIcon, AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Notifications as NotificationsIcon, Person as PersonIcon, Widgets } from '@mui/icons-material'
import moment from 'moment'
import { SearchField, CurveButton } from '../../components/styles/styleComponents'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'

const Dashboard = () => {

  const Appbar =
    <Paper
      elevation={3}
      sx={{
        padding: '2rem',
        margin: '2rem 0',
        borderRadius: '1rem',
        bgcolor: 'rgba(10, 10, 10, 1)',
        border: '1px solid red ',
        color: 'white',
      }}
    >
      <Stack direction={'row'} spacing={'1rem'}>
        <AdminPanelSettingsIcon sx={{ fontSize: '2.5rem' }} />

        {/* This is Input feild */}
        <SearchField placeholder='Search...' />

        {/* This is Button */}
        <CurveButton>Search</CurveButton>

        <Box flexGrow={1} />
        <Typography
          display={{
            xs: 'none',
            lg: 'block',
          }}
          color={'rgba(0,0,0,0.7'}
          textAlign={'center'}
        >
          {moment().format('ddd D MMM YYYY, h:mm:ss a ')}
        </Typography>

        <NotificationsIcon />

      </Stack>
    </Paper>


  const Widgets = <Stack
    direction={{
      xs: 'column',
      sm: 'row'
    }}
    spacing={'2rem'}
    justifyContent={'space-between'}
    alignItems={'center'}
    margin={'2rem 0'}
    color={'white'}
  >
    <Widget title={'Users'} value={43} Icon={<PersonIcon />} />
    <Widget title={'Chats'} value={3} Icon={<GroupIcon />} />
    <Widget title={'Message'} value={434} Icon={<MessageIcon />} />
  </Stack>



  return (
    <AdminLayout >
      <Container component={'main'}>
        {Appbar}

        <Stack 
        direction={{xs: 'column', lg: 'row'}} 
        flexWrap={'wrap'}
        justifyContent={'center'}
        alignItems={{xs: 'center', lg: 'strecth'}}
        sx={{gap: '2rem'}}
        >
          <Paper
            elevation={3}
            sx={{
              padding: '2rem 3.5rem',
              borderRadius: '1rem',
              bgcolor: 'rgba(10, 10, 10, 1)',
              border: '1px solid red ',
              color: 'white',
              width: '100%',
              maxWidth: '45rem',
            }}
          >
            <Typography margin={'2rem 0'} variant='h4'>
              Last Message
            </Typography>

            <LineChart value={[24,65,21,65,2]} />

          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: '1rem ',
              borderRadius: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'rgba(10, 10, 10, 1)',
              border: '1px solid red ',
              position: 'relative',
              flex: 1,
              // width: { xs: '100%', sm: '50%' },
              color: 'white',
              width: '100%',
              maxWidth: '25rem',
              // height: '25rem'
            }}>

            <DoughnutChart value={[23,66]} labels={['Single Chats', 'Group Chats']} />

            <Stack
              position={'absolute'}
              direction={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              spacing={'0.5rem'}
              width={'100%'}
              height={'100%'}
            >
              <GroupIcon />
              <Typography>Vs</Typography>

              <PersonIcon />
            </Stack>
          </Paper>

        </Stack>
        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) =>
  <Paper sx={{
    padding: '2rem',
    margin: '2rem 0',
    borderRadius: '1rem',
    width: '20rem',
    color: 'white',
    bgcolor: 'rgba(10, 10, 10, 1)',
    border: '1px solid red'
  }}>
    <Stack alignItems={'center'} spacing={'1rem'}>

      <Typography
        sx={{
          borderRadius: '50%',
          border: '5px solid red',
          width: '5rem',
          height: '5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {value}
      </Typography>

      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>

    </Stack>
  </Paper>


export default Dashboard
