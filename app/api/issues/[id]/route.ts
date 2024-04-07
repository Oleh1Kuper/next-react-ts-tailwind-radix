import authOptions from '@/app/auth/authOptions';
import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

type Props = {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);
  const {
    title,
    description,
    assignedToUserId,
    status,
  } = body;

  if (assignedToUserId) {
    const user = prisma.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Inavlid user' }, { status: 400 });
    }
  }

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
    data: {
      title,
      description,
      assignedToUserId,
      status: status || (assignedToUserId ? 'IN_PROGRESS' : 'CLOSED'),
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

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
