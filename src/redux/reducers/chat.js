
// chatSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import { NEW_MESSAGE_ALERT } from '../../../../server/constants/event';
// // import { getOrSaveFromStorage } from '../path/to/utilityFile';

// const initialState = {
//   notificationCount: 0,
//   newMessageAlert: getOrSaveFromStorage({
//     key: NEW_MESSAGE_ALERT,
//     get: true,
//   }) || [
//     {
//       chatId: "",
//       count: 0,
//     },
//   ],
// };

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     incrementNotification: (state) => {
//       state.notificationCount += 1;
//     },
//     resetNotification: (state) => {
//       state.notificationCount = 0;
//     },
//     setNewMessageAlert: (state, action) => {
//       const index = state.newMessageAlert.findIndex(
//         (item) => item.chatId === action.payload.chatId
//       );

//       if (index !== -1) {
//         state.newMessageAlert[index].count += 1;
//       }
//       else {
//         state.newMessageAlert.push({
//           chatId,
//           count: 1,
//         })
//       }
//     }
//   },
// });

// export const { incrementNotification, resetNotification, setNewMessageAlert } = chatSlice.actions;
// export default chatSlice;





// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   notificationCount: 0,
//   newMessageAlert: [],
// };

// const chatSlice = createSlice({
//   name: 'chat',
//   initialState,
//   reducers: {
//     incrementNotification: (state) => {
//       state.notificationCount += 1;
//     },
//     resetNotification: (state) => {
//       state.notificationCount = 0;
//     },
//     setNewMessageAlert: (state, action) => {
//         const index = state.newMessageAlert.findIndex(
//             (item) => item.chatId === action.payload.chatId
//         );

//         if (index !== -1) {
//             // Increment count if chatId exists
//             state.newMessageAlert[index].count += 1;
//         } else {
//             // Add new chatId entry if it doesn't exist
//             state.newMessageAlert.push({
//                 chatId: action.payload.chatId,
//                 count: 1,
//             });
//         }
//     },
//   },
// });

// export const { incrementNotification, resetNotification, setNewMessageAlert } = chatSlice.actions;
// export default chatSlice;




import { createSlice } from '@reduxjs/toolkit';
import { NEW_MESSAGE_ALERT } from '../../constants/event';

// Local storage helper
const getOrSaveFromStorage = ({ key, get, value }) => {
  const storageKey = `myApp_${key}`;

  if (get) {
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : null;
  }

  if (value !== undefined) {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }
};

const initialState = {
  notificationCount: 0,
  newMessageAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    incrementNotification: (state) => {
      state.notificationCount += 1;
    },
    resetNotification: (state) => {
      state.notificationCount = 0;
    },
    setNewMessageAlert: (state, action) => {
      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );

      if (index !== -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId: action.payload.chatId,
          count: 1,
        });
      }
    },
  },
});

export const { incrementNotification, resetNotification, setNewMessageAlert } =
  chatSlice.actions;
export default chatSlice;
