/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button, Callout, TextField,
} from '@radix-ui/themes';
import axios from 'axios';
import { MdError } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import 'easymde/dist/easymde.min.css';
import { schema } from '@/app/validationSchema';
import { z } from 'zod';
import dynamic from 'next/dynamic';
import { ErrorMessage, Spinner } from '@/app/components';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  { ssr: false },
);

type IssueFormData = z.infer<typeof schema>
type Props = {
  issue?: Issue;
}

const IssueForm: React.FC<Props> = ({ issue }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({ resolver: zodResolver(schema) });

  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: IssueFormData) => {
    setIsSubmitting(true);

    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setErrorMessage('Something went Wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      {errorMessage && (
      <Callout.Root color="red" className="mb-5">
        <Callout.Icon>
          <MdError />
        </Callout.Icon>

        <Callout.Text>
          {errorMessage}
        </Callout.Text>
      </Callout.Root>
      )}

      <form
        className="space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>

        <ErrorMessage>
          {errors.title?.message}
        </ErrorMessage>

        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
              ref={null}
            />
          )}
        />

        <ErrorMessage>
          {errors.description?.message}
        </ErrorMessage>

        <Button disabled={isSubmitting} className="cursor-pointer">
          Submit new issue
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
