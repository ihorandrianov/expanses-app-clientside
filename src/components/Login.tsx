import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isLoggedIn, logIn } from '../client/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import img from '../assets/bg.jpg';
import { CircleLoader } from 'react-spinners';
import { CheckCircleSharp } from '@mui/icons-material';

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logInMutation = useMutation(logIn, {
    onSettled: () => {
      queryClient.invalidateQueries(['session']);
    },
  });
  useQuery(['session'], isLoggedIn, {
    onSuccess: () => {
      navigate('/profile');
    },
    retry: 0,
    enabled: logInMutation.isSuccess,
  });

  return (
    <>
      <div className="w-[100vw] h-[100vh] flex justify-center items-center ">
        <div className="w-2/3 h-2/3 bg-slate-300 rounded-xl flex overflow-hidden shadow-xl">
          <div className="h-full md:w-2/5 w-full bg-gradient-to-r from-blue-500 to-blue-600 flex flex-col items-center justify-center">
            <h1 className="text-2xl mb-5 font-light text-center tracking-wide text-white">
              Track your expanses
            </h1>
            <p className="text-white font-light uppercase tracking-wide text-xs mb-5">
              Login now to start
            </p>
            <Formik
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string().email().required(),
                password: Yup.string().required(),
              })}
              onSubmit={(values) => {
                logInMutation.mutate(values);
              }}
            >
              <Form className="flex flex-col justify-center items-center gap-5">
                <Field
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="p-2 rounded placeholder:font-light placeholder:text-sm placeholder:tracking-wide w-full"
                />
                <Field
                  name="password"
                  type="password"
                  placeholder="Your password"
                  className="p-2 rounded placeholder:font-light placeholder:text-sm  placeholder:tracking-wide w-full"
                />
                {logInMutation.isError && (
                  <p className="p-1 text-red-800 bg-stone-300 bg-opacity-30 rounded font-thin">
                    Wrong password or email
                  </p>
                )}
                {logInMutation.isLoading && (
                  <CircleLoader color="white" size={20} />
                )}
                {logInMutation.isSuccess && (
                  <CheckCircleSharp htmlColor="white" fontSize="large" />
                )}
                <button
                  type="submit"
                  className="bg-white p-3 rounded-sm uppercase text-sm font-thin tracking-wider w-full hover:scale-105 transition-transform duration-500"
                >
                  Login
                </button>
              </Form>
            </Formik>

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
            className="h-full w-3/5 bg-no-repeat bg-center bg-cover md:flex hidden items-center justify-center"
            style={{ backgroundImage: `url(${img})` }}
          ></div>
        </div>
      </div>
    </>
  );
};
