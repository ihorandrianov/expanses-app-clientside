import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { changePassword, isLoggedIn } from '../client/api';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required(),
  newPassword: Yup.string().required(),
  confirmationPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Password dont match')
    .required('Password required'),
});

export const EditPasswordPage: FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery(['session'], isLoggedIn);
  const updateUserPassword = useMutation(changePassword, {
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
          oldPassword: '',
          newPassword: '',
          confirmationPassword: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (user) {
            updateUserPassword.mutate({
              ...values,
              userId: user.id,
            });

            navigate('/');
          }
        }}
      >
        <Form className="flex flex-col gap-5 xl:w-full h-full m-24">
          <h1 className="text-2xl font-light uppercase tracking-wide">
            Change password
          </h1>
          <div className="mb-3">
            <p className="mb-3 text-sm font-light uppercase">Old password</p>
            <Field
              type="password"
              name="oldPassword"
              placeholder="Old password"
              className="p-3 text-sm font-light placeholder:text-sm placeholder:font-light"
            />
            <ErrorMessage
              name="oldPassword"
              component="div"
              className="text-xs text-red-600 mt-3 ml-3"
            />
          </div>
          <div className="mb-3">
            <p className="mb-3 text-sm font-light uppercase">New password</p>
            <Field
              type="password"
              name="newPassword"
              placeholder="New password"
              className="p-3 text-sm font-light placeholder:text-sm placeholder:font-light"
            />
            <ErrorMessage
              name="newPassword"
              component="div"
              className="text-xs text-red-600 mt-3 ml-3"
            />
          </div>
          <div className="mb-3">
            <p className="mb-3 text-sm font-light uppercase">
              Repeat new password
            </p>
            <Field
              type="password"
              name="confirmationPassword"
              placeholder="Repeat new password"
              className="p-3 text-sm font-light placeholder:text-sm placeholder:font-light"
            />
            <ErrorMessage
              name="confirmationPassword"
              component="div"
              className="text-xs text-red-600 mt-3 ml-3"
            />
          </div>
          <div className="flex items-center gap-5">
            <button
              type="submit"
              className="bg-white p-3 rounded w-40 font-thin tracking-wide"
            >
              Confirm
            </button>
            <Link to="/profile" className="font-thin text-blue-800">
              Cancel
            </Link>
          </div>
        </Form>
      </Formik>
    </>
  );
};
