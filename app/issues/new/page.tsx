/* eslint-disable react/jsx-props-no-spreading */

'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { MdError } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import SimpleMDE from 'react-simplemde-editor';
import { zodResolver } from '@hookform/resolvers/zod';
import 'easymde/dist/easymde.min.css';
import { schema } from '@/app/validationSchema';
import { z } from 'zod';

type IssueForm = z.infer<typeof schema>

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueForm>({ resolver: zodResolver(schema) });
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: IssueForm) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setErrorMessage('Something went Wrong');
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
            placeholder="Title"
            {...register('title')}
          />
        </TextField.Root>
        {errors.title && <Text as="p" color="red">{errors.title.message}</Text>}
        <Controller
          control={control}
          name="description"
          render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
        />
        {errors.description && <Text as="p" color="red">{errors.description.message}</Text>}
        <Button className="cursor-pointer">
          Submit new issue
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
