import React from 'react';
import prisma from '@/prisma/client';
import Markdown from 'react-markdown';
import { notFound } from 'next/navigation';
import {
  Card, Flex, Heading, Text,
} from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';

type Props = {
  params: { id: string };
}

const IssueDetailPage: React.FC<Props> = async ({ params: { id } }) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) {
    notFound();
  }

  return (
    <div>
      <Heading>
        {issue.title}
      </Heading>
      <Flex gap="3" my="2">
        <Text>
          <IssueStatusBadge status={issue.status} />
        </Text>
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <Markdown>
          {issue.description}
        </Markdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
