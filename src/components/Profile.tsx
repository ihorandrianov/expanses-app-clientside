import { FC, useContext } from 'react';
import { Header } from './Header';
import { useQuery } from '@tanstack/react-query';
import { isLoggedIn } from '../client/api';
import { ProfileInfo } from './ProfileInfo';
import { ExpansesPreview } from './ExpansesPreview';

export const Profile: FC = () => {
  const { data: user, isLoading, isError } = useQuery(['user'], isLoggedIn);

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (isError) {
    return <>Please log in</>;
  }
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center">
      <Header />
      <section className="w-[95vw] h-[85vh] bg-blue-100 mt-5 flex justify-center items-center ">
        {user ? (
          <>
            <ProfileInfo user={user} />
            <ExpansesPreview userId={user.id} />
          </>
        ) : (
          <p>Please login to see user info</p>
        )}
      </section>
    </div>
  );
};
