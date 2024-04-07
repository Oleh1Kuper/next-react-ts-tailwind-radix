import React from 'react';
import { Pagination } from '@/app/components';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import { Metadata } from 'next';
import { Flex } from '@radix-ui/themes';
import IssueTable, { IssueQuery, columnNames } from './IssueTable';
import IssueToolBar from './IssueToolBar';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: IssueQuery;
}

const IssuesPage: React.FC<Props> = async ({ searchParams }) => {
  const statuses = Object.values(Status);
  const statusToFilter = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const where = { status: statusToFilter };

  const orderBy = columnNames.includes(searchParams.sort)
    ? { [searchParams.sort]: searchParams.order || 'asc' }
    : undefined;

  const page = +searchParams.page || 1;
  const pageSize = +searchParams.issuePerPage || 5;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueToolBar />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        pageSize={pageSize}
        itemCount={issueCount}
        currentPage={page}
      />
    </Flex>
  );
};

export default IssuesPage;

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue list',
  description: 'View all project issues',
};
