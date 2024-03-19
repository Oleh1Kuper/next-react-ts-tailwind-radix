import React from 'react';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import Link from 'next/link';
import IssueToolBar from './IssueToolBar';

export const dynamic = 'force-dynamic';

type Props = {
  searchParams: { status: Status, sort: keyof Issue, order: string };
}

const IssuesPage: React.FC<Props> = async ({ searchParams }) => {
  const columns: {
    label: string;
    value: keyof Issue;
    className?: string;
  }[] = [
    { label: 'Issue', value: 'title' },
    { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
    { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
  ];
  const statuses = Object.values(Status);
  const statusToFilter = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const orderBy = columns
    .map(({ value }) => value).includes(searchParams.sort)
    ? { [searchParams.sort]: searchParams.order }
    : undefined;

  const setSortingOrder = (sortValue: keyof Issue) => {
    if (searchParams.sort !== sortValue) {
      return 'asc';
    }

    if (searchParams.order === 'asc') {
      return 'desc';
    }

    return 'asc';
  };

  const issues = await prisma.issue.findMany({
    where: {
      status: statusToFilter,
    },
    orderBy,
  });

  return (
    <div>
      <IssueToolBar />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map(({ label, value, className }) => (
              <Table.ColumnHeaderCell
                key={label}
                className={className}
              >
                <Link href={{
                  query: { ...searchParams, sort: value, order: setSortingOrder(value) },
                }}
                >
                  {label}
                </Link>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map(({
            id, title, status, createdAt,
          }) => (
            <Table.Row key={id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${id}`}>
                  {title}
                </Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={status} />
                </div>
              </Table.RowHeaderCell>

              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={status} />
              </Table.Cell>

              <Table.Cell className="hidden md:table-cell">
                {createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default IssuesPage;
