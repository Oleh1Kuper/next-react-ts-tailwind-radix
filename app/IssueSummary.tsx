import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

type Props = {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary: React.FC<Props> = ({ open, closed, inProgress }) => {
  const containers: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
    { label: 'In progress Issues', value: inProgress, status: 'IN_PROGRESS' },
  ];

  return (
    <Flex gap="4">
      {containers.map(({ label, status, value }) => (
        <Card key={label}>
          <Flex direction="column" gap="1">
            <Link href={`/issues/list?status=${status}`} className="text-sm font-medium">
              {label}
            </Link>

            <Text size="5" className="font-bold">
              {value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
