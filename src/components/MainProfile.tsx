import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { isLoggedIn } from '../client/api';
import { ExpansesPreview } from './ExpansesPreview';
import { ProfileInfo } from './ProfileInfo';

export const MainProfile: FC = () => {
  const { data: user, isLoading, isError } = useQuery(['session'], isLoggedIn);

  if (isLoading) {
    return (
      <>
        <ClimbingBoxLoader color="#3695d6" />
      </>
    );
  }

  if (isError) {
    return <>Please log in</>;
  }

  return (
    <>
      {user ? (
        <>
          <ProfileInfo user={user} />
          <div className="flex xl:w-1/2 w-full justify-center items-start overflow-y-scroll h-full">
            <ExpansesPreview userId={user.id} />
          </div>
        </>
      ) : (
        <p>Please login to see user info</p>
      )}
    </>
  );
};
