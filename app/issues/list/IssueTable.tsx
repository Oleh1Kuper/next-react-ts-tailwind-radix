import React from 'react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa6';
import { IssueStatusBadge, Link as CustomLink } from '@/app/components';
import { Box, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { Issue, Status } from '@prisma/client';

export type IssueQuery = {
  status: Status;
  sort: keyof Issue;
  order: string;
  page: string;
  issuePerPage: string;
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
      return { sort: sortValue, order: undefined };
    }

    if (!searchParams.order) {
      return { sort: sortValue, order: 'desc' };
    }

    return { sort: sortValue, order: undefined };
  };

  const displayIcon = (value: string) => {
    switch (true) {
      case value === searchParams.sort && !searchParams.order:
        return <FaCaretUp />;

      case searchParams.sort === value && !!searchParams.order:
        return <FaCaretDown />;

      default:
        return (
          <>
            <FaCaretUp className="absolute -top-[10px]" />
            <FaCaretDown className="absolute -top-1" />
          </>
        );
    }
  };

  if (!issues.length) {
    return <p>Create a new issue</p>;
  }

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map(({ label, value, className }) => (
            <Table.ColumnHeaderCell
              key={label}
              className={className}
            >
              <Link
                className="flex items-center gap-2"
                href={{
                  query: {
                    ...searchParams,
                    ...setSortingOrder(value),
                  },
                }}
              >
                {label}
                <Box className="relative items-center">
                  {displayIcon(value)}
                </Box>
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
