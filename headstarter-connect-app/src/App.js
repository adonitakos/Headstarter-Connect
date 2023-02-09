import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Landing from './pages/Landing' 
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import Profile from './pages/Profile'
import Calendar from './pages/Calendar'
import VideoChat from './pages/VideoChat'


const HeaderLayout = () => (
  <>
    <Outlet />
  </>
)

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: '/',
        element: <Landing />
      },
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <SignUp/>
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/calendar',
        element: <Calendar />
      },
      {
        path: '/video_chat',
        element: <VideoChat />
      }
    ]
  }
]) // <--- router ends here

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;