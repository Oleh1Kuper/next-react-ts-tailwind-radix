'use client';

import React from 'react';
import { Select } from '@radix-ui/themes';
import { Issue, User } from '@prisma/client';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/app/components';

type Props = {
  issue: Issue;
}

const AssigneeSelect: React.FC<Props> = ({ issue }) => {
  const { data: users, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users')
      .then(({ data }) => data),
    staleTime: 60 * 1000,
  });

  if (error) return null;
  if (isLoading) return <Skeleton height="2rem" />;

  const handleAssign = (id: string | null) => {
    axios.patch(`/api/issues/${issue.id}`, { assignedToUserId: id });
  };

  return (
    <Select.Root
      defaultValue={issue.assignedToUserId || ''}
      onValueChange={
        (userId) => handleAssign(userId === 'unassigned' ? null : userId)
      }
    >
      <Select.Trigger placeholder="Assign..." />

      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>
          <Select.Item value="unassigned">
            Unassigned
          </Select.Item>
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
