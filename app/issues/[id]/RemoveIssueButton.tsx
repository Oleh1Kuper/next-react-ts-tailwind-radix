import { Button } from '@radix-ui/themes';
import React from 'react';
import { MdDelete } from 'react-icons/md';

type Props = {
  id: number;
}

const RemoveIssueButton: React.FC<Props> = ({ id }) => (
  <Button color="red">
    <MdDelete />
    Delete issue
  </Button>
);

export default RemoveIssueButton;
