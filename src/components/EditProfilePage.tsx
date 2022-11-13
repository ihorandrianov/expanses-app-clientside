import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { editProfile, isLoggedIn } from '../client/api';
import * as Yup from 'yup';

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email('It must be email').required('Email is required'),
  name: Yup.string()
    .min(2, 'Minimum 5 characters')
    .required('Name is required'),
});

export const EditPage: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useQuery(['session'], isLoggedIn);

  const updateUserMutation = useMutation(editProfile, {
    onSettled: () => {
      queryClient.invalidateQueries();
    },
  });

  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Formik
        initialValues={{
          email: user?.email,
          name: user?.name,
        }}
        validationSchema={ValidationSchema}
        onSubmit={async (values) => {
          updateUserMutation.mutate({ id: user!.id, payload: values });
          navigate('/profile');
        }}
      >
        <Form className="flex flex-col gap-12 mr-auto ml-24">
          <h1 className="text-2xl font-light uppercase tracking-wide">
            Edit profile
          </h1>
          <div className="flex flex-col">
            <h1 className="mb-3 text-sm font-light uppercase">Email:</h1>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              className="p-3 text-sm font-light"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-xs text-red-600 mt-3 ml-3"
            />
          </div>
          <div>
            <h1 className="mb-3 text-sm font-light uppercase">Name:</h1>
            <Field
              type="text"
              name="name"
              placeholder="Name"
              className="p-3 text-sm font-light"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-xs text-red-600 mt-3 ml-3"
            />
          </div>
          <div className="flex flex-row items-center gap-5">
            <button
              className="bg-white p-3 rounded font-thin tracking-wide"
              type="submit"
            >
              Submit
            </button>
            <Link
              to="/profile"
              className="text-blue-800 font-thin tracking-wide"
            >
              Cancel
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};
