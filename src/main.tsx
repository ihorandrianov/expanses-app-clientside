import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './components/Login';
import { Profile } from './components/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Register } from './components/Register';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/expanses',
    element: <>Expanses</>,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
