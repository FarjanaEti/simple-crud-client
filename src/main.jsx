import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Users from './Component/Users.jsx';
import Update from './Component/Update.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path:'/users',
    element:<Users></Users>,
    loader:()=>fetch('http://localhost:5000/users'),
  },
  {
    path:'/update/:id',
    element:<Update></Update>,
    loader: async ({ params }) => {
      const response = await fetch(`http://localhost:5000/users/${params.id}`);
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      return response.json();
    },
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
       <RouterProvider router={router} />
  </StrictMode>,
)
