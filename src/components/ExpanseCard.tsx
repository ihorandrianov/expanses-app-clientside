import { DeleteForeverOutlined } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { CircleLoader } from 'react-spinners';
import { deleteExpanse } from '../client/api';
import { Expanse } from '../Types/types';

type Props = {
  expanse: Expanse;
};

export const ExpanseCard: FC<Props> = ({ expanse }) => {
  const { title, amount, spentAt, category, id, userId } = expanse;
  const [formatedDate, formatedTime] = spentAt!.split('T');
  const stripedTime = formatedTime.slice(0, 5);
  const queryClient = useQueryClient();
  const deleteExpanseMutation = useMutation(
    ['deleteExpanse', userId],
    deleteExpanse,
    {
      onSettled: () => {
        queryClient.invalidateQueries(['expansesPreview', userId]);
      },
    }
  );

  const handleDelete = () => {
    if (id) {
      deleteExpanseMutation.mutate(id);
    }
  };

  return (
    <li className="flex justify-evenly w-ful md:flex-row flex-col gap-12 shadow-xl mb-5 border border-blue-300 rounded-md p-5 relative">
      <div className="flex flex-col">
        <h1 className="text-3xl font-thin uppercase mb-3 tracking-wide">
          {title}
        </h1>
        <p className="border border-blue-500 text-center rounded-xl bg-blue-300 w-[100px] hover:scale-110 font-light transition-transform duration-300">
          {amount + '$'}
        </p>
      </div>
      <div className="flex flex-col">
        <h1 className="font-thin text-xl uppercase tracking-wide mb-3">
          {category}
        </h1>
        <p className="font-thin">
          {'Spent at ' + stripedTime + ' ' + formatedDate}
        </p>
      </div>
      <div className="flex justify-center items-center">
        <Link
          className="text-xl text-blue-800 hover:text-blue-300 font-light"
          to={`/expanses/${id}`}
        >
          More info here!
        </Link>
      </div>
      <button onClick={handleDelete} className="absolute top-3 right-3">
        {deleteExpanseMutation.isIdle && (
          <DeleteForeverOutlined className="text-blue-500" />
        )}
        {deleteExpanseMutation.isLoading && (
          <CircleLoader color="rgb(59 130 246)" size={20} />
        )}
      </button>
    </li>
  );
};
