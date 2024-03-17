import React from 'react';
import prisma from '@/prisma/client';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';

const IssuesPage = async () => {
  const issues = await prisma.issue.findMany();

  return (
    <div>
      <div className="mb-5">
        <Button>
          <Link href="/issues/new">New issue</Link>
        </Button>
      </div>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>
              Issue
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>

            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map(({
            id, title, status, createdAt,
          }) => (
            <Table.Row key={id}>
              <Table.RowHeaderCell>
                {title}
                <div className="block md:hidden">{status}</div>
              </Table.RowHeaderCell>

              <Table.Cell className="hidden md:table-cell">
                {status}
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
