// import React, { Suspense, useEffect, lazy } from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { LayoutLoaders } from './components/layout/Loaders';
// import ProtectRoute from './components/auth/ProtectRoute'
// import axios from 'axios'
// import { server } from './constants/config';
// import { useDispatch, useSelector } from 'react-redux';
// import { userExists, userNotExists } from './redux/reducers/auth'
// import { Toaster } from 'react-hot-toast'
// import { SocketProvider } from './utils/socket';

// const Home = lazy(() => import('./pages/home'));
// const Login = lazy(() => import('./pages/login'));
// const Chat = lazy(() => import('./pages/chat'));
// const Group = lazy(() => import('./pages/group'));
// const NotFound = lazy(() => import('./pages/NotFound'));
// const Dashboard = lazy(() => import('./pages/admin/Dashboard'));


// const AdminLogin = lazy(() => import('./pages/admin/AdminLogin'));
// const UserManagement = lazy(() => import('./pages/admin/UserManagement'));
// const MessageManagement = lazy(() => import('./pages/admin/MessageManagement'));
// const ChatManagement = lazy(() => import('./pages/admin/ChatManagement'));


// // const user = true;

// const App = () => {

//   const { user, loder } = useSelector(state => state.auth)

//   const dispatch = useDispatch();


//   useEffect(() => {

//     axios
//       .get(`${server}/api/v1/user/me`, { withCredentials: true })
//       .then(({ data }) => dispatch(userExists(data.user)))
//       .catch((err) => dispatch(userNotExists()));
//   }, [dispatch])

//   return loder ? (
//     <LayoutLoaders />
//   ) : (
//     <BrowserRouter>
//       <Suspense fallback={<LayoutLoaders />}>
//         <Routes>
//           {/* <Route element={<SocketProvider>
//             <ProtectRoute use={user} />
//           </SocketProvider>}> */}

//           <Route element={<SocketProvider><ProtectRoute user={user} /></SocketProvider>}>


//             <Route path='/' element={<Home />} />
//             <Route path='/chat/:chatId' element={<Chat />} />
//             <Route path='/group' element={<Group />} />

//           </Route>

//           <Route path='/login' element={<ProtectRoute user={!user} redirect='/'><Login /></ProtectRoute>} />
//           {/* <Route element={<SocketProvider><ProtectRoute user={user} /></SocketProvider>}> */}


//           <Route path='/admin' element={<AdminLogin />} />
//           <Route path='/admin/dashboard' element={<Dashboard />} />
//           <Route path='/admin/users' element={<UserManagement />} />
//           <Route path='/admin/chats' element={<ChatManagement />} />
//           <Route path='/admin/messages' element={<MessageManagement />} />




//           <Route path='*' element={<NotFound />} />


//         </Routes>
//       </Suspense>
//       <Toaster position='bottom-center' />
//     </BrowserRouter>
//   );
// };

// export default App




import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoaders } from "./components/layout/Loaders";
import axios from "axios";
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./utils/socket";

const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Chat = lazy(() => import("./pages/chat"));
const Groups = lazy(() => import("./pages/group"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessagesManagement = lazy(() =>
  import("./pages/admin/MessageManagement")
);

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/me`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);

  return loader ? (
    <LayoutLoaders />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoaders />}>
        <Routes>
          <Route
            element={
              <SocketProvider>
                <ProtectRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect="/">
                <Login />
              </ProtectRoute>
            }
          />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessagesManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;

