import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider, redirect } from 'react-router-dom';
import NavigationBar from './components/Navbar/Navbar'
import Landing from './pages/Landing' 
import SignUp from './pages/SignUp';
import Login from './pages/Login'
import Profile from './pages/Profile'
import Calendar from './pages/Calendar'
import VideoChat from './pages/VideoChat'
import { UserProvider } from './config/user'
import { auth } from './config/firebaseconfig'

const HeaderLayout = () => (
  <>
    <NavigationBar />
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
      },
      {
        path: '/sign_out',
        loader: async () => {
          await auth.signOut()
          return redirect('/')
        }
      }
    ]
  } // <--- routes JSON object ends here
]) // <--- router ends here

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>

  );
} // <--- App() ends here

export default App;