import { getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from '@auth/core/jwt';
import { NextRequest, NextResponse } from 'next/server';

// CREATE NEW POST

export async function POST(req: NextRequest) {
  const session: SessionType | JWT | any = await getServerSession();

  const body = await req.json();

  try {
    if (!session) {
      return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    }

    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session.user?.email, //this is the user email who created the post
        createdAt: new Date(),
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
