import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExpansesById } from '../client/api';

type Props = {
  userId: number;
};

export const ExpansesPreview: FC<Props> = ({ userId }) => {
  const { data, isLoading } = useQuery(['expansesPreview', userId], () =>
    getExpansesById(userId)
  );

  const expanses = data?.expanses;

  return (
    <ul className="md:w-1/2">
      {isLoading && <p>Loading...</p>}
      {expanses &&
        expanses.map((expanse) => <li key={expanse.id}>{expanse.title}</li>)}
    </ul>
  );
};
