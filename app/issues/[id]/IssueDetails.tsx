import React from 'react';
import { IssueStatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import {
  Heading, Flex, Card, Text,
} from '@radix-ui/themes';
import Markdown from 'react-markdown';

type Props = {
  issue: Issue;
}

const IssueDetails: React.FC<Props> = ({ issue }) => (
  <>
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
  </>
);

export default IssueDetails;
