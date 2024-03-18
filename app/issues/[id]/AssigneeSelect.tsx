'use client';

import React from 'react';
import { Select } from '@radix-ui/themes';
import { User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/app/components';

const AssigneeSelect = () => {
  const { data: users, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users')
      .then(({ data }) => data),
    staleTime: 60 * 1000,
  });

  if (error) return null;
  if (isLoading) return <Skeleton height="2rem" />;

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          {users?.map(({ id, name }) => (
            <Select.Item key={id} value={id}>
              {name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
