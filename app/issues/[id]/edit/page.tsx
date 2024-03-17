import React from 'react';
import { notFound } from 'next/navigation';
import prisma from '@/prisma/client';
import IssueForm from '../../_components/IssueForm';

type Props = {
  params: { id: string };
}

const EditIssuePage: React.FC<Props> = async ({ params: { id } }) => {
  const issue = await prisma.issue.findUnique({ where: { id: +id } });

  if (!issue) {
    notFound();
  }

  return (
    <IssueForm issue={issue} />
  );
};

export default EditIssuePage;
