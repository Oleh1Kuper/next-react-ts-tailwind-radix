import React from 'react';
import { IssueStatusBadge, Link as CustomLink } from '@/app/components';
import { Table } from '@radix-ui/themes';
import Link from 'next/link';
import { Issue, Status } from '@prisma/client';

export type IssueQuery = {
  status: Status;
  sort: keyof Issue;
  order: string;
  page: string;
}

type Props = {
  searchParams: IssueQuery;
  issues: Issue[];
}

const columns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: 'Issue', value: 'title' },
  { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
  { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' },
];

const IssueTable: React.FC<Props> = ({ searchParams, issues }) => {
  const setSortingOrder = (sortValue: keyof Issue) => {
    if (searchParams.sort !== sortValue) {
      return 'asc';
    }

    if (searchParams.order === 'asc') {
      return 'desc';
    }

    return 'asc';
  };

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(({ label, value, className }) => (
            <Table.ColumnHeaderCell
              key={label}
              className={className}
            >
              <Link href={{
                query: {
                  ...searchParams,
                  sort: value,
                  order: setSortingOrder(value),
                },
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
              <CustomLink href={`/issues/${id}`}>
                {title}
              </CustomLink>
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
  );
};

export const columnNames = columns.map(({ value }) => value);

export default IssueTable;
