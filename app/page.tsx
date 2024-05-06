import React from 'react';
import prisma from '@/prisma/client';
import { Flex, Grid } from '@radix-ui/themes';
import { Metadata } from 'next';
import LatestIssues from './LatestIssues';
import IssueSummary from './IssueSummary';
import IssueChart from './IssueChart';

type Props = {
  searchParams: { page: string };
}

export const dynamic = 'force-dynamic';

const Home: React.FC<Props> = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });

  return (
    <Grid gap="5" columns={{ initial: '1', md: '2' }}>
      <Flex gap="5" direction="column">
        <IssueSummary
          open={open}
          closed={closed}
          inProgress={inProgress}
        />
        <IssueChart
          open={open}
          closed={closed}
          inProgress={inProgress}
        />
      </Flex>
      <LatestIssues />
    </Grid>
  );
};

export default Home;

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues',
};
