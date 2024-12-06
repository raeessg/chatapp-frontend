import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/Shared/Table'
import { Avatar } from '@mui/material'
import { dashboardData } from '../../constants/sampleData'
import {transformImage} from '../../lib/Features'


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
    renderCell: (params) => <Avatar alt={params.row.name} src={params.row.avatar} />
    
  },
  {
    field: 'name',        // its take as a reference
    headerName: 'Name',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'username',        // its take as a reference
    headerName: 'Username',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'friends',        // its take as a reference
    headerName: 'Friends',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 150,
  },
  {
    field: 'groups',        // its take as a reference
    headerName: 'Groups',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 150,
  },
]

const UserManagement = () => {

  const [rows, setRows] = useState([]);

  useEffect(() => {

    setRows(dashboardData.users.map((i) => 
      ({ ...i, id: i._id, avatar: 
        transformImage(i.avatar,50) 
      })))

  }, []);

  return (
    <AdminLayout>
      <Table heading={'All Users'} columns={columns} rows={rows} />
    </AdminLayout>
  )
}

export default UserManagement
