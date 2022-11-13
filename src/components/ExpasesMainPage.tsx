import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';

export const ExpansesMainPage: FC = () => {
  return (
    <div className=" h-[100vh] w-[100vw] flex flex-col items-center">
      <Header />
      <section className="w-[95vw] h-[85vh] bg-blue-100 mt-5 flex relative overflow-x-hidden">
        <Outlet />
      </section>
    </div>
  );
};
