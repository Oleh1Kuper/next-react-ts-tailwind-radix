import React from 'react';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const IssueToolBar = () => (
  <div className="mb-5">
    <Button>
      <Link href="/issues/new">New issue</Link>
    </Button>
  </div>
);

export default IssueToolBar;
