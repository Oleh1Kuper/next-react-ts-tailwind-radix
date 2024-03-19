'use client';

import React from 'react';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses: { label: string, value?: Status }[] = [
  { label: 'All' },
  { label: 'Open', value: 'OPEN' },
  { label: 'Closed', value: 'CLOSED' },
  { label: 'In progress', value: 'IN_PROGRESS' },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');

  const onChangeStatus = (status: string) => {
    const params = new URLSearchParams();

    if (status !== 'ALL') {
      params.append('status', status);
    }

    if (sort) {
      params.append('sort', sort!);
    }

    if (order) {
      params.append('order', order!);
    }

    router.push(`/issues/list?${params.toString()}`);
    router.refresh();
  };

  return (
    <Select.Root
      onValueChange={onChangeStatus}
      defaultValue={searchParams.get('status') || 'ALL'}
    >
      <Select.Trigger placeholder="Filter by status" />

      <Select.Content>
        {statuses.map(({ label, value }) => (
          <Select.Item key={label} value={value || 'ALL'}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
