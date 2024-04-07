'use client';

import React from 'react';
import { Select } from '@radix-ui/themes';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Status } from '@prisma/client';

type Props = {
  id: number;
}

type DataType = { label: string; value: Status };

const AssignIssueStatust: React.FC<Props> = ({ id }) => {
  const data: DataType[] = [
    { label: 'Open', value: 'OPEN' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'In progress', value: 'IN_PROGRESS' },
  ];

  const router = useRouter();
  const handleAssign = async (status: string) => {
    try {
      await axios
        .patch(`/api/issues/${id}`, { status });
      toast.success('Changes was saved.', {
        position: 'top-center',
      });
      router.refresh();
    } catch {
      toast.error('Changes could not be saved.', {
        position: 'top-center',
      });
    }
  };

  return (
    <Select.Root
      onValueChange={(status) => handleAssign(status)}
    >

      <Select.Trigger placeholder="Change status" />

      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestions</Select.Label>

          {data.map(({ value, label }) => (
            <Select.Item key={label} value={value}>
              {label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssignIssueStatust;
