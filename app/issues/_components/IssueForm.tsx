/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Button, TextField,
} from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import 'easymde/dist/easymde.min.css';
import { schema } from '@/app/validationSchema';
import { z } from 'zod';
import { ErrorMessage, Spinner, AlertError } from '@/app/components';
import { Issue } from '@prisma/client';
import SimpleMdeReact from 'react-simplemde-editor';

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

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: IssueFormData) => {
    setIsSubmitting(true);

    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post('/api/issues', data);
      }
      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setErrorMessage('Something went Wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl">
      {errorMessage && (
        <AlertError>
          {errorMessage}
        </AlertError>
      )}

      <form
        className="space-y-3 mt-5"
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
            <SimpleMdeReact
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
          {issue ? 'Update issue' : 'Submit new issue'}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
