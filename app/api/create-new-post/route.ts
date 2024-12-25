import { getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// CREATE A COMMENT
export async function POST(req: Request) {
  const session: SessionType | JWT | any = await getServerSession(req);
  console.log('🚀 ~ POST ~ session:', session);

  try {
    if (!session) {
      return NextResponse.json(
        { message: 'You must be logged in to create a post' },
        { status: 401 }
      );
    }

    const body = await req.json();

    console.log(
      '🚀 ~ \n\n\n\n POST ~ body=>>>>:',
      body,
      '\n\n\n\n session=>>>>',
      session
    );

    const post = await prisma.post.create({
      data: {
        ...body,
        userEmail: session?.email,
      },
    });

    console.log('Post created:', post);
    return NextResponse.json(post);
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
