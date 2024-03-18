import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import RemoveIssueButton from './RemoveIssueButton';
import AssigneeSelect from './AssigneeSelect';

type Props = {
  params: { id: string };
}

const IssueDetailPage: React.FC<Props> = async ({ params: { id } }) => {
  const session = await getServerSession(authOptions);
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) {
    notFound();
  }

  return (
    <Grid
      columns={{
        initial: '1',
        sm: '5',
      }}
      gap="5"
    >
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>

      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton id={issue.id} />
            <RemoveIssueButton id={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export default IssueDetailPage;
