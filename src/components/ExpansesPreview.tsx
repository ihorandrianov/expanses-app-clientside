import { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getExpansesById } from '../client/api';
import { ExpansesPreviewCard } from './ExpansesPrevievCard';
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader';

type Props = {
  userId: number;
};

export const ExpansesPreview: FC<Props> = ({ userId }) => {
  const { data: expanses, isLoading } = useQuery(
    ['expansesPreview', userId],
    () => getExpansesById(userId)
  );

  if (isLoading) {
    return (
      <div className="absolute place-self-center">
        <ClimbingBoxLoader color="#3695d6" />
      </div>
    );
  }

  return (
    <ul className="md:w-full flex flex-col gap-5 p-3 items-center">
      {expanses && expanses.length ? (
        expanses.map((expanse) => (
          <ExpansesPreviewCard expanse={expanse} key={expanse.id} />
        ))
      ) : (
        <p className="text-sm uppercase font-ligh text-center">
          No expanses yet
        </p>
      )}
    </ul>
  );
};
