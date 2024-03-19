'use client';

import React from 'react';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  pageSize: number;
  itemCount: number;
  currentPage: number;
}

const Pagination: React.FC<Props> = ({ pageSize, itemCount, currentPage }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageCount = Math.ceil(itemCount / pageSize);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <Flex align="center" gap="2">
      <Text>
        {`Page ${currentPage} of ${pageCount}`}
      </Text>
      <Button
        disabled={currentPage === 1}
        variant="soft"
        color="gray"
        onClick={() => changePage(1)}
      >
        <DoubleArrowLeftIcon />
      </Button>

      <Button
        disabled={currentPage === 1}
        variant="soft"
        color="gray"
        onClick={() => changePage(currentPage - 1)}
      >
        <ChevronLeftIcon />
      </Button>

      <Button
        disabled={currentPage === pageCount}
        variant="soft"
        color="gray"
        onClick={() => changePage(currentPage + 1)}
      >
        <ChevronRightIcon />
      </Button>

      <Button
        disabled={currentPage === pageCount}
        variant="soft"
        color="gray"
        onClick={() => changePage(pageCount)}
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};

export default Pagination;
