import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
import { schema } from '../../validationSchema';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({}, { status: 401 });
  }

  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const issue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}
