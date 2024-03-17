import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import { Pencil1Icon } from '@radix-ui/react-icons';

type Props = {
  id: number;
}

const EditIssueButton: React.FC<Props> = ({ id }) => (
  <Button>
    <Pencil1Icon />
    <Link href={`/issues/${id}/edit`}>
      Edit Issue
    </Link>
  </Button>
);

export default EditIssueButton;
