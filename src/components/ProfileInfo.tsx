import { FC } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../Types/types';

type Props = {
  user: User;
};

export const ProfileInfo: FC<Props> = ({ user }) => {
  const { name, email } = user;
  return (
    <div className="w-[365px] md:w-1/2 ml-10 h-full flex justify-center items-start flex-col">
      <h1 className="text-2xl uppercase font-thin">Name:</h1>
      <p className="text-2xl font-thin mb-5">{name}</p>
      <h1 className="text-2xl uppercase font-thin">Email:</h1>
      <p className="text-2xl font-thin mb-5">{email}</p>
      <div className="flex gap-5">
        <Link
          className="text-sm font-thin uppercase hover:text-blue-500 underline underline-offset-4"
          to="/profile/edit"
        >
          Edit profile
        </Link>
        <Link
          className="text-sm font-thin uppercase hover:text-blue-500 underline underline-offset-4"
          to="/profile/password"
        >
          Change password
        </Link>
      </div>
    </div>
  );
};
