import React from 'react';
import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssueToolBar = () => (
  <Flex justify="between">
    <IssueStatusFilter />
    <Button>
      <Link href="/issues/new">New issue</Link>
    </Button>
  </Flex>
);

export default IssueToolBar;
