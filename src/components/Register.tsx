import { FC } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { RegisterData, registerNewUser } from '../client/api';
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(10, 'Maximum 10 chars!')
    .required('Name is required!'),
  email: Yup.string().email('Wrong email').required('Email is required!'),
  password: Yup.string().required('Password is required').min(5, 'Min 5 chars'),
});

export const Register: FC = () => {
  const navigate = useNavigate();

  const registerUserMutation = useMutation(registerNewUser, {
    onSuccess: () => {
      navigate('/');
    },
  });

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center ">
      <div className="w-2/3 h-2/3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex overflow-hidden shadow-xl">
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
          }}
          validationSchema={signUpSchema}
          onSubmit={(values) => {
            registerUserMutation.mutate(values);
          }}
        >
          <Form className="flex flex-col m-14 gap-5 w-1/2">
            <h1 className="text-center text-white font-thin tracking-wide uppercase">
              Registration form
            </h1>
            <div className="flex items-center gap-3">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="placeholder:text-sm placeholder:font-this placeholder:uppercase p-3 w-1/2"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm font-light p-3 bg-red-300 border-red-800 border rounded-md text-red-800"
              />
            </div>
            <div className="flex items-center gap-3">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="placeholder:text-sm placeholder:font-this placeholder:uppercase p-3 w-1/2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-sm font-light p-3 bg-red-300 border-red-800 border rounded-md text-red-800"
              />
            </div>
            <div className="flex items-center gap-3">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="placeholder:text-sm placeholder:font-this placeholder:uppercase p-3 w-1/2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm font-light p-3 bg-red-300 border-red-800 border rounded-md text-red-800"
              />
            </div>
            {registerUserMutation.isError && (
              <p className="text-sm text-red-500">
                Some error happened here! Maybe email is already taken
              </p>
            )}
            {registerUserMutation.isLoading && (
              <CircleLoader color="white" size={20} />
            )}
            <div className="flex items-center gap-5">
              <button
                type="submit"
                className="bg-white p-3 w-60 text-sm uppercase font-light hover:scale-105 transition-transform duration-500"
              >
                Submit
              </button>
              <Link
                to="/"
                className="text-white font-light tracking-wide hover:text-blue-300 transition-colors duration-500"
              >
                Go back
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
