import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';
import IssuePerPage from './IssuePerPage';

const IssueToolBar = () => (
  <Flex justify="between">
    <Flex gap="3">
      <IssueStatusFilter />
      <IssuePerPage />
    </Flex>
    <Button>
      <Link href="/issues/new">New issue</Link>
    </Button>
  </Flex>
);

export default IssueToolBar;
