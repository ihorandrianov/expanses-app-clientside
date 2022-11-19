import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { getExpansesById } from '../client/api';
import { ExpanseCard } from './ExpanseCard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { AddExpanseForm } from './AddExpanseForm';
import { ClimbingBoxLoader } from 'react-spinners';
import { User } from '../Types/types';
import { useLoaderData } from 'react-router-dom';
import { animated, useSpring } from '@react-spring/web';

export const AllUserExpanses: FC = () => {
  const [showForm, setShowForm] = useState(false);
  const styles = useSpring({
    opacity: showForm ? 1 : 0,
    translateX: showForm ? '-50%' : '100%',
    translateY: '-50%',
  });
  const user = useLoaderData() as User;
  const userId = user.id;
  const { data: expanses, isLoading: isLoadingExpanses } = useQuery(
    ['expansesPreview', userId],
    () => getExpansesById(userId)
  );

  const handleFormShow = () => setShowForm(!showForm);

  if (isLoadingExpanses) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ClimbingBoxLoader color="#3695d6" />
      </div>
    );
  }

  return (
    <div className="m-10 overflow-y-auto w-full xl:w-1/2">
      <ul className="w-full overflow-y-hidden flex flex-col justify-center">
        {expanses &&
          expanses.map((expanse) => (
            <ExpanseCard key={expanse.id} expanse={expanse} />
          ))}
      </ul>
      <button
        className="absolute right-5 bottom-5 hover:scale-110 transition-transform duration-300"
        onClick={handleFormShow}
      >
        <AddCircleOutlineIcon fontSize="large" className="text-blue-600" />
      </button>

      <animated.div
        style={styles}
        className="absolute top-1/2 left-1/2 xl:left-[70vw] -translate-y-1/2 p-5 rounded-xl xl:w-1/3 xl:h-[80vh] h-3/4 w-full shadow-xl bg-blue-200"
      >
        <AddExpanseForm userId={user.id} />
      </animated.div>
    </div>
  );
};
