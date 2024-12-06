// import { Box, Typography } from '@mui/material';
// import React, { memo, useEffect, useRef } from 'react'
// import moment from 'moment';
// import { fileFormate } from '../../lib/features'
// import RenderAttachment from './RandereAttachment'
// import UserDetails from './UserDetails';

// const MessageComponents = ({ message, user }) => {

//     const { sender, content, attachments = [], createdAt } = message;

//     const sameSender = sender?._id === user?._id;

//     const timeAgo = moment(createdAt).fromNow() 

//     return (
//         <div
//             style={{
//                 alignSelf: sameSender ? 'flex-end' : 'flex-start',
//                 backgroundColor: 'rgba(0,0,0,0.3)',
//                 color: 'white',
//                 borderRadius: '0.5rem',
//                 width: 'fit-content',
//                 padding: '0.6rem'
//             }}
//         >

//             {/* Sender Name */}
//             {!sameSender && <Typography
//                 color={'#2694ab'}
//                 fontWeight={'600'}
//                 variant={"caption"}
//             >{sender.name}</Typography>}


//             {/* Messages */}
//             {content && <Typography>{content}</Typography>}


//             {/* Attachment */}
//             {attachments.length > 0 && attachments.map((attachment, index) => {

//                 const url = attachment.url
//                 const file = fileFormate(url);

//                 return <Box key={index}>
//                     <a
//                         href={url}
//                         target='_blank'
//                         download
//                         style={{ color: 'black' }}
//                     >
//                         {RenderAttachment(file, url)}
//                     </a>
//                 </Box>

//             })}

//             <Typography textAlign={'right'} fontSize={'11px'} color='white'>{timeAgo}</Typography>
//         </div>
//     )
// }

// export default memo(MessageComponents)





import { Avatar, Box, Typography } from '@mui/material';
import React, { memo } from 'react';
import moment from 'moment';
import { fileFormate } from '../../lib/Features';
import RenderAttachment from './RandereAttachment';
import { motion } from 'framer-motion'

const MessageComponents = ({ message, user }) => {
    const { sender, content, attachments = [], createdAt } = message;

    const sameSender = sender?._id === user?._id; // Check if the current message is from the user
    const timeAgo = moment(createdAt).fromNow(); // Format the timestamp

    return (
        <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            whileInView={{ opacity: 1, x: 0 }}
            style={{
                alignSelf: sameSender ? 'flex-end' : 'flex-start',
                // backgroundColor: 'rgba(0,0,0,4)',
                color: 'white',
                // borderRadius: '0.5rem',
                width: 'fit-content',
                // padding: '0.6rem',
                marginBottom: '0.5rem' // Add margin for spacing
            }}
        >
            {/* Sender Name */}
            {!sameSender && sender && (
                // <Typography
                //     color={'#2694ab'}
                //     fontWeight={'600'}
                //     variant={"caption"}
                // >
                //     {sender.name}
                //     {/* {sender.avatar} */}

                // </Typography>
                <Avatar
                    sx={{
                        width: '25px',
                        height: '25px',
                        // margin: '10px, 10px, 20px, 0'
                        marginBottom: '0.4rem'
                    }}
                    // src={sender.avatar}
                    src={sender.avatar || ''}
                    alt={sender.name}
                >
                    {/* {!sender.avatar && sender.name && sender.name[0].toUpperCase()} */}
                    {!sender.avatar && sender.name && sender.name[0].toUpperCase()}

                </Avatar>
            )}
            {/* Message box */}
            <Box
                sx={{
                    backgroundColor: sameSender ? '#FF6968' : 'rgba(0,0,0,0.2)',
                    backdropFilter: 'blur(15px)',
                    // bgcolor: 'red',
                    // padding: '0.4rem',
                    borderRadius: '0.5rem',
                    textAlign: sameSender ? 'right' : 'left'
                }}>
                    {content && <Typography sx={{padding: '0.4rem'}}>{content}</Typography>}


                {/* Attachment */}
                {attachments.length > 0 && attachments.map((attachment, index) => {
                    const url = attachment.url;
                    const file = fileFormate(url);

                    return (
                        <Box sx={{backgroundColor: 'none'}} key={index}>
                            <a
                                href={url}
                                target='_blank'
                                download
                                style={{ 
                                    color: 'black',
                                 }}
                            >
                                {RenderAttachment(file, url)}
                            </a>
                        </Box>
                    );
                })}
            </Box>

            <Typography marginTop={'0.1rem'} textAlign={'right'} fontSize={'10px'} color='white'>
                {timeAgo}
            </Typography>
        </motion.div>
    );
};

export default memo(MessageComponents);
