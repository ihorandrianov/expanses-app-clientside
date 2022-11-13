import { useQuery } from '@tanstack/react-query';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';
import { getExpanseById } from '../client/api';

export const ExpansePage: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: expanse,
    isLoading,
    isError,
  } = useQuery(['expanse', id], () => getExpanseById(Number(id)));

  if (isLoading) {
    return (
      <div className="self-center ml-[200px]">
        <ClimbingBoxLoader color="#3695d6" />
      </div>
    );
  }
  const { title, amount, spentAt, category, note } = expanse;
  const [formatedDate, formatedTime] = spentAt.split('T');
  const stripedTime = formatedTime.slice(0, 5);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-between self-center xl:flex-row flex-col gap-24 m-10 relative border border-black rounded-2xl p-3 border-opacity-50 shadow-2xl w-full">
      <div>
        <h1 className="text-3xl uppercase font-light border border-blue-800 shadow-md p-3 mb-10 rounded-md">
          {title}
        </h1>
        <p className="text-2xl font-thin mb-3">{amount + '$'}</p>
        <p className="font-thin">{category}</p>
        <p className="font-thin">{formatedDate + ' ' + stripedTime}</p>
      </div>
      <div className="w-1/2 items-center justify-center h-full">
        <p className="text-2xl font-thin ">{note}</p>
      </div>
      <button
        className="absolute -top-24 font-thin text-xl hover:text-blue-500 p-3 border rounded-xl border-black"
        onClick={handleGoBack}
      >
        Go back
      </button>
    </div>
  );
};
