import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Box, Grid } from '@radix-ui/themes';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

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
        <IssueDetails issue={issue} />
      </Box>

      <Box>
        <EditIssueButton id={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
