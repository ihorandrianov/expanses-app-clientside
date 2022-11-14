import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { resendEmailToken, verifyEmail } from '../client/api';
import { Header } from './Header';

export const EmailVerify: FC = () => {
  const [searchParams, _] = useSearchParams();
  const token = searchParams.get('token');
  const queryClient = useQueryClient();
  const verifyEmailMutation = useMutation(verifyEmail, {
    onSettled: () => queryClient.invalidateQueries(),
  });
  const resendEmailMutation = useMutation(resendEmailToken, {
    onSettled: () => queryClient.invalidateQueries(),
  });

  const handleVerify = () => {
    if (token) {
      verifyEmailMutation.mutate({ token });
    }
  };

  const handleResend = () => {
    resendEmailMutation.mutate();
  };

  useMutation;
  return (
    <div className="w-[100vw] h-[100vh] flex flex-col items-center">
      <section className="w-[95vw] h-[85vh] bg-blue-100 mt-5 flex flex-col justify-center gap-5 items-center">
        <h1 className="text-2xl font-thin uppercase">Click here to verify</h1>
        <button
          className="bg-white p-3 font-thin uppercase"
          onClick={handleVerify}
        >
          Verify
        </button>
        <button
          className="bg-white p-3 font-thin uppercase"
          onClick={handleResend}
        >
          Resend email
        </button>
        {resendEmailMutation.isError && (
          <p className="text-sm p-3 text-red-500">Cannot resend email</p>
        )}
        {verifyEmailMutation.isError && (
          <p className="text-sm p-3 text-red-500">Cannot verify email</p>
        )}
      </section>
    </div>
  );
};
