import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Header } from './Header';

export const ErrorPage: FC = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center">
      <Header />
      <section className="w-[95vw] h-[85vh] bg-blue-100 mt-5 flex xl:flex-row flex-col justify-center items-center">
        {`Please ${(<Link to={'/'}>Log in</Link>)} to keep accounting`}
      </section>
    </div>
  );
};
