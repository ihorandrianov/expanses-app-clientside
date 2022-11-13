import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Expanse } from '../Types/types';

type Props = {
  expanse: Expanse;
};

export const ExpansesPreviewCard: FC<Props> = ({ expanse }) => {
  const { id, title, amount, category } = expanse;

  return (
    <li className="w-full h-24 flex border border-blue-300 rounded justify-evenly items-center p-3 shadow-xl">
      <div className="">
        <h1 className="text-sm uppercase font-thin">Title:</h1>
        <p className="font-light capitalize">{title}</p>
      </div>
      <div>
        <h1 className="text-sm uppercase font-thin">Amount:</h1>
        <p className="font-light">{amount + '$'}</p>
      </div>
      <div>
        <h1 className="text-sm uppercase font-thin">Category:</h1>
        <p className="font-light">{category}</p>
      </div>
      <div>
        <Link
          className="text-sm uppercase font-thin hover:text-blue-600"
          to={`/expanses/${id}`}
        >
          More info...
        </Link>
      </div>
    </li>
  );
};
