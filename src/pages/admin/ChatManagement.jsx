import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/Shared/Table'
import { Avatar, Stack } from '@mui/material'
import { dashboardData } from '../../constants/sampleData'
import { transformImage } from '../../lib/Features'
import AvatarCard from '../../components/Shared/AvatarCard'


// (Not Work) Error = Data is not being received from sampledata


const columns = [
  {
    field: 'id',        // its take as a reference
    headerName: 'ID',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'avatar',        // its take as a reference
    headerName: 'Avatar',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 150,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />

  },
  {
    field: 'name',        // its take as a reference
    headerName: 'Name',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 300,
  },
  {
    field: 'totalMembers',        // its take as a reference
    headerName: 'Total Members',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 120,
  },
  {
    field: 'members',        // its take as a reference
    headerName: 'Members',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    )
  },
  {
    field: 'totalMessages',        // its take as a reference
    headerName: 'Total Messages',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 150,
  },
  {
    field: 'creator',        // its take as a reference
    headerName: 'Created By',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 250,
    renderCell: (params) => (
      <Stack direction='row' alignItems='center' spacing={'1rem'}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    )
  },
]

const ChatManagement = () => {

  const [rows, setRows] = useState([]);

  useEffect(() => {

    setRows(dashboardData.chats.map((i) => ({
      ...i,
      id: i._id,
      avatar: i.avatar.map((i) => transformImage(i, 50)),
      members: i.members.map((i) => transformImage(i.avatar, 50)),
      creator: {
        name: i.creator.name,
        avatar: transformImage(i.avatar,50)
      }
    })))

  }, []);

  return (
    <AdminLayout>
      <Table heading={'All Chats'} columns={columns} rows={rows} />
    </AdminLayout>
  )
}


export default ChatManagement
