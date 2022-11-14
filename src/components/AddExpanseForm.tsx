import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC } from 'react';
import { CircleLoader } from 'react-spinners';
import * as Yup from 'yup';
import { addNewExpanse } from '../client/api';
import { Expanse } from '../Types/types';

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  amount: Yup.number().required('Write something here'),
  category: Yup.string().required('Category is required'),
  note: Yup.string(),
});

type Props = {
  userId: number;
};

export const AddExpanseForm: FC<Props> = ({ userId }) => {
  const queryClient = useQueryClient();
  const queryKey = ['expansesPreview', userId];
  const newExpanseMutation = useMutation(addNewExpanse, {
    onMutate: async (newExpanse) => {
      await queryClient.cancelQueries(queryKey);
      const date = new Date();
      const prevExpanses = queryClient.getQueryData(queryKey) as Expanse[];
      queryClient.setQueryData(queryKey, [
        ...prevExpanses,
        { ...newExpanse, spentAt: date.toISOString() },
      ]);

      return { prevExpanses, newExpanse };
    },
    onError: (error, newExpanse, context) => {
      queryClient.setQueryData(queryKey, context?.prevExpanses);
    },
  });

  return (
    <div>
      <Formik
        initialValues={{
          title: '',
          amount: 0,
          category: '',
          note: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          newExpanseMutation.mutate({
            ...values,
            userId,
          });
          actions.resetForm();
        }}
      >
        <Form className="flex flex-col gap-3 justify-center items-center">
          <h1 className="text-2xl font-thin uppercase">Add new expanse</h1>
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm font-thin uppercase">
              Title
            </label>
            <Field
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              className="p-2 placeholder:font-thin tracking-wide"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-xs text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="amount" className="text-sm font-thin uppercase">
              Amount
            </label>
            <Field
              id="amount"
              type="number"
              name="amount"
              placeholder="Amount"
              className="p-2 placeholder:font-thin tracking-wide"
            />
            <ErrorMessage
              name="amount"
              component="div"
              className="text-xs text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="category" className="text-sm font-thin uppercase">
              Category
            </label>
            <Field
              id="category"
              type="text"
              name="category"
              placeholder="Category"
              className="p-2 placeholder:font-thin tracking-wide"
            />
            <ErrorMessage
              name="category"
              component="div"
              className="text-xs text-red-600"
            />
          </div>
          <div className="flex flex-col gap-1 mb-3">
            <label htmlFor="note" className="text-sm font-thin uppercase">
              Note
            </label>
            <Field
              id="note"
              type="text"
              component="textarea"
              name="note"
              placeholder="Note"
              className="p-2 placeholder:font-thin tracking-wide"
            />
            <ErrorMessage
              name="note"
              component="div"
              className="text-xs text-red-600"
            />
          </div>
          {newExpanseMutation.isError && (
            <p className="text-sm text-red-500 font-light">
              Somenthing went wrong
            </p>
          )}
          <button
            className="p-3 bg-white font-thin uppercase rounded-sm w-[100px] hover:scale-105 transition-transform duration-300"
            type="submit"
          >
            Add
          </button>
        </Form>
      </Formik>
    </div>
  );
};
