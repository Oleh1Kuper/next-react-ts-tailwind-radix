import React from 'react';
import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';

type Props = {
  status: Status;
}

const IssueStatusBadge: React.FC<Props> = ({ status }) => {
  const setCurrentStatus = (item: Status): [string, 'green' | 'orange' | 'violet'] => {
    switch (item) {
      case 'OPEN':
        return ['Open', 'orange'];

      case 'IN_PROGRESS':
        return ['In progress', 'violet'];

      default:
        return ['Closed', 'green'];
    }
  };

  const [statusValue, color] = setCurrentStatus(status);

  return (
    <Badge color={color}>
      {statusValue}
    </Badge>
  );
};

export default IssueStatusBadge;
