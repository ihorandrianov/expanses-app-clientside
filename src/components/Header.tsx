import { FC, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logOut } from '../client/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const links = ['expanses', 'profile'];

export const Header: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: user, isError } = useQuery(['session'], isLoggedIn, {
    retry: 0,
  });
  const useLogOutMutation = useMutation({
    mutationFn: logOut,
    onSettled: () => {
      queryClient.invalidateQueries(['session']);
    },
  });
  const handleLogOut = () => {
    useLogOutMutation.mutate();
  };

  const noSession = () => {
    navigate('/');
  };

  useEffect(() => {
    if (isError) {
      noSession();
    }
  }, [isError]);

  return (
    <div className="w-full h-20 bg-gradient-to-r from-blue-500 to-blue-600 flex justify-center xl:justify-between items-center">
      <h1 className="ml-5 uppercase text-white font-thin text-2xl hidden xl:block">
        <Link to="/profile">Expanses app</Link>
      </h1>
      <nav>
        <ul className="flex gap-10 justify-between m-5 xl:mr-5">
          {links.map((link) => (
            <li key={link}>
              <Link
                to={`/${link}`}
                className="uppercase font-thin text-white tracking-wide"
              >
                {link}
              </Link>
            </li>
          ))}
          <li>
            {user ? (
              <button
                onClick={handleLogOut}
                className="uppercase font-thin text-white tracking-wide"
              >
                Log out
              </button>
            ) : (
              <Link
                className="uppercase font-thin text-white tracking-wide"
                to="/"
              >
                Log in
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};
