import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/Shared/Table'
import { Avatar, Box, Skeleton, Stack } from '@mui/material'
import { dashboardData } from '../../constants/sampleData'
import { fileFormate, transformImage } from '../../lib/Features'
import AvatarCard from '../../components/Shared/AvatarCard'
import moment from 'moment'
import RandereAttachment from '../../components/Shared/RandereAttachment'
import { useFetchData } from '6pp'
import { server } from '../../constants/config'
import {useErrors} from '../../hooks/hook'

const columns = [
  {
    field: 'id',        // its take as a reference
    headerName: 'ID',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 200,
  },
  {
    field: 'attachments',        // its take as a reference
    headerName: 'Attachments',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => {

      const {attachments} = params.row;

      return attachments?.length > 0 ? attachments.map((i)=>{

        const url = i.url;
        const file = fileFormate(url);

        return <Box>
          <a 
          href={url}
          download
          target='_blank'
          style={{
            color: 'black'
          }}
          >
            {RandereAttachment(file,url)}
          </a>

        </Box>
      }) : 'No Attachments';
    }
  },
  {
    field: 'content',        // its take as a reference
    headerName: 'Content',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 400,
  },
  {
    field: 'sender',        // its take as a reference
    headerName: 'Sent By',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 200,
    renderCell: (params) => (
      <Stack direction={'row'} spacing={'1rem'} alignItems={'center'}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    )
  },
  {
    field: 'chat',        // its take as a reference
    headerName: 'Chat',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 220,
  },
  {
    field: 'groupchat',        // its take as a reference
    headerName: 'Group Chat',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 100,
  },
  {
    field: 'createdAt',        // its take as a reference
    headerName: 'Time',   // (headerName) it is only for users Screen
    headerClassName: 'table-header',
    width: 250,
  },

]

const MessageManagement = () => {

  const {loading, data, error} = useFetchData(
    `${server}/api/v1/admin/messages`,
    "dashboard-messages"
  );

  useErrors([
    {
      isError: error,
      error: error,
    },
  ])

  const [rows, setRows] = useState([]);

  useEffect(() =>{
   if(data){
    setRows(data.messages.map((i) => ({
      ...i,
      id: i._id,
      sender: {
        name: i.sender.name,
        avatar: transformImage(i.sender.avatar,50),
      },
      createdAt: moment(i.createAt).format("MMM Do YYYY, h:mmm:se a")
    }))
  )
   }
  },[data])


  return (
    <AdminLayout>
      {loading ? (
        <Skeleton/>
      ) : (
      <Table 
      heading={'All Messages'} 
      columns={columns} 
      rows={rows} 
      rowHeight={200} 
      />
      )}
    </AdminLayout>
  )
}

export default MessageManagement
