import React, { FC, FormEvent, useContext, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logIn, LoginCred, logOut } from '../client/api';
import { useMutation } from '@tanstack/react-query';
import { User } from '../Types/types';

export const LoginPage: FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const mutationFn = async (creds: LoginCred): Promise<User | null> => {
    const user = await logIn(creds);

    return user;
  };
  const logInMutation = useMutation(mutationFn, {
    onSettled: async (data) => {
      if (!data) {
        setIsError(true);
      } else {
        navigate('/profile');
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    setIsError(false);
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      logInMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center ">
        <div className="w-2/3 h-2/3 bg-slate-300 rounded-xl flex overflow-hidden shadow-xl">
          <div className="h-full w-2/5 bg-gradient-to-r from-blue-500 to-blue-600 flex flex-col items-center justify-center">
            <h1 className="text-2xl mb-5 font-light text-center tracking-wide text-white">
              Track your expanses
            </h1>
            <p className="text-white font-light uppercase tracking-wide text-xs mb-5">
              Login now to start
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-5"
            >
              <input
                ref={emailRef}
                type="email"
                placeholder="Your email"
                className="p-2 rounded placeholder:font-light placeholder:text-sm placeholder:tracking-wide w-full"
              />
              <input
                ref={passwordRef}
                type="password"
                placeholder="Your password"
                className="p-2 rounded placeholder:font-light placeholder:text-sm  placeholder:tracking-wide w-full"
              />
              {isError && (
                <p className="m-2 bg-white text-red-600">
                  Wrong password or email
                </p>
              )}
              <button
                type="submit"
                className="bg-white px-3 py-2 rounded-sm uppercase text-sm font-light tracking-wider w-full hover:scale-105 transition-transform duration-500"
              >
                Login
              </button>
            </form>
            <p className="text-sm font-light text-white mt-20">
              Dont have account?{' '}
              <Link
                className="hover:text-yellow-300 text-green-300 italic"
                to="/register"
              >
                Sign up!
              </Link>
            </p>
          </div>
          <div
            className="h-full w-3/5 bg-blue-300 bg-no-repeat bg-center bg-cover flex items-center justify-center"
            style={{ backgroundImage: 'url(src/assets/bg.jpg)' }}
          ></div>
        </div>
      </div>
    </>
  );
};
