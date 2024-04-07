'use client';

import { Select } from '@radix-ui/themes';
import { useSearchParams, useRouter } from 'next/navigation';
import React from 'react';

const IssuePerPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sort');
  const order = searchParams.get('order');
  const status = searchParams.get('status');

  const onChangeIssuePerPage = (item: string) => {
    const params = new URLSearchParams();

    if (status) {
      params.append('status', status!);
    }

    if (sort) {
      params.append('sort', sort!);
    }

    if (order) {
      params.append('order', order!);
    }

    params.append('issuePerPage', item);

    router.push(`/issues/list?${params.toString()}`);
    router.refresh();
  };

  return (
    <Select.Root
      onValueChange={onChangeIssuePerPage}
      defaultValue={searchParams.get('issuePerPage') || ''}
    >
      <Select.Trigger placeholder="Issues per page" />

      <Select.Content>
        {[3, 5, 10, 20].map((item) => (
          <Select.Item key={item} value={item.toString()}>
            {item}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssuePerPage;
