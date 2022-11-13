import { FC, useContext } from 'react';
import { Header } from './Header';
import { useQuery } from '@tanstack/react-query';
import { isLoggedIn } from '../client/api';
import { Outlet } from 'react-router-dom';

export const Profile: FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center">
      <Header />
      <section className="w-[95vw] h-[85vh] bg-blue-100 mt-5 flex xl:flex-row flex-col justify-center items-center">
        <Outlet />
      </section>
    </div>
  );
};
