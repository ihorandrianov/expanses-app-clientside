import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from './components/Login';
import { Profile } from './components/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Register } from './components/Register';
import { MainProfile } from './components/MainProfile';
import { EditPage } from './components/EditProfilePage';
import { EditPasswordPage } from './components/EditPasswordPage';
import { ExpansesMainPage } from './components/ExpasesMainPage';
import { AllUserExpanses } from './components/AllUserExpanses';
import { ExpansePage } from './components/ExpansePage';
import { EmailVerify } from './components/EmailVerify';
import { isLoggedIn } from './client/api';
import { User } from './Types/types';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/profile',
    element: <Profile />,
    children: [
      {
        path: '/profile/',
        element: <MainProfile />,
      },
      {
        path: '/profile/edit',
        element: <EditPage />,
      },
      {
        path: '/profile/password',
        element: <EditPasswordPage />,
      },
    ],
  },
  {
    path: '/expanses',
    element: <ExpansesMainPage />,
    children: [
      {
        path: '/expanses/',
        element: <AllUserExpanses />,
        loader: async () => {
          const user = await isLoggedIn();
          return user as User;
        },
      },
      {
        path: '/expanses/:id',
        element: <ExpansePage />,
      },
    ],
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/verify',
    element: <EmailVerify />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
