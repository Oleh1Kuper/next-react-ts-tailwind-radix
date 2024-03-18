'use client';

import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import React from 'react';
import { MdDelete } from 'react-icons/md';

type Props = {
  id: number;
}

const RemoveIssueButton: React.FC<Props> = ({ id }) => (
  <AlertDialog.Root>
    <AlertDialog.Trigger>
      <Button color="red">
        <MdDelete />
        Delete issue
      </Button>
    </AlertDialog.Trigger>

    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>
        Confirm deletion
      </AlertDialog.Title>

      <AlertDialog.Description size="2">
        Are you sure you want to delete this issue?
        This issue will no longer be accessible.
      </AlertDialog.Description>

      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            Cancel
          </Button>
        </AlertDialog.Cancel>

        <AlertDialog.Action>
          <Button variant="solid" color="red">
            Delete
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  </AlertDialog.Root>
);

export default RemoveIssueButton;
