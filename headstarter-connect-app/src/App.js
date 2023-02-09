import 'bootstrap/dist/css/bootstrap.min.css'
import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Landing from './pages/Landing' 

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
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;