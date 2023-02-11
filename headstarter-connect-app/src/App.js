import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import NavigationBar from './components/Navbar/Navbar'
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
) // <--- HeaderLayout() ends here

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
  } // <--- routes JSON object ends here
]) // <--- router ends here

function App() {
  return (
    <>    
      <NavigationBar />
      <RouterProvider router={router} />
    </>

  );
} // <--- App() ends here

export default App;