'use client';

import React, { useState } from 'react';
import {
  AlertDialog, Button, Flex,
} from '@radix-ui/themes';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AlertError, Spinner } from '@/app/components';

type Props = {
  id: number;
}

const RemoveIssueButton: React.FC<Props> = ({ id }) => {
  const [isError, setIsError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsDeleting(true);

    try {
      await axios.delete(`/api/issues/${id}`);
      router.push('/issues/list');
      router.refresh();
    } catch (error) {
      setIsError(true);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button disabled={isDeleting} className="bg-red-700">
            {!isDeleting && <MdDelete />}
            Delete issue
            {isDeleting && <Spinner />}
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
              <Button
                variant="solid"
                className="bg-red-700"
                onClick={handleClick}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={isError}>
        <AlertDialog.Content>
          <AlertDialog.Title>
            Error
          </AlertDialog.Title>

          <AlertDialog.Description>
            <AlertError>
              This issue could not be deleted.
            </AlertError>

            <Flex mt="4" justify="end">
              <Button
                variant="soft"
                color="gray"
                onClick={() => setIsError(false)}
              >
                Ok
              </Button>
            </Flex>
          </AlertDialog.Description>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default RemoveIssueButton;
