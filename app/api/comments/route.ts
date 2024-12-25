import { getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// GET COMMENTS BY POST SLUG
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const postSlug: string = (searchParams.get('postSlug') as string) || '';

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug ? { postSlug: postSlug } : { postSlug: 'example-post' }), //is optional
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!comments) {
      return NextResponse.json(
        { message: 'Comments not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(comments, { status: 200 });
  } catch (error: any) {
    console.log('🚀 ~ \n\n\n\n\n post:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

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

    const post = await prisma.comment.create({
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
