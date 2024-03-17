import React from 'react';
import prisma from '@/prisma/client';
import Markdown from 'react-markdown';
import { notFound } from 'next/navigation';
import {
  Box,
  Button,
  Card, Flex, Grid, Heading, Text,
} from '@radix-ui/themes';
import { IssueStatusBadge } from '@/app/components';
import { Pencil1Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

type Props = {
  params: { id: string };
}

const IssueDetailPage: React.FC<Props> = async ({ params: { id } }) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) {
    notFound();
  }

  return (
    <Grid
      columns={{
        initial: '1',
        sm: '2',
      }}
      gap="5"
    >
      <Box>
        <Heading>
          {issue.title}
        </Heading>

        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>

        <Card className="prose" mt="4">
          <Markdown>
            {issue.description}
          </Markdown>
        </Card>
      </Box>

      <Box>
        <Button>
          <Pencil1Icon />
          <Link href={`/issues/${id}/edit`}>
            Edit Issue
          </Link>
        </Button>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
