import { schema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: +params.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: +params.id },
  });

  if (!issue) {
    return NextResponse.json({ error: 'Issue is not found' }, { status: 404 });
  }

  const deleteIssue = await prisma.issue.delete({
    where: {
      id: +params.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });

  return NextResponse.json(deleteIssue);
}
