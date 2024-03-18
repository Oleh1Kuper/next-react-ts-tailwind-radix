'use client';

import React from 'react';
import { Select } from '@radix-ui/themes';

const AssigneeSelect = () => (
  <Select.Root>
    <Select.Trigger placeholder="Assign..." />

    <Select.Content>
      <Select.Group>
        <Select.Label>Suggestions</Select.Label>
        <Select.Item value="1">Oleh Kuper</Select.Item>
      </Select.Group>
    </Select.Content>
  </Select.Root>
);

export default AssigneeSelect;
