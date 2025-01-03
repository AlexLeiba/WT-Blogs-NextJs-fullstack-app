import { getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// GET COMMENTS BY POST SLUG
export async function GET(req: NextRequest) {
  const session: SessionType | JWT | any = await getServerSession();

  const { searchParams } = new URL(req.url);

  const postSlug: string = (searchParams.get('postSlug') as string) || '';

  try {
    const comments = await prisma.comment.findMany({
      where: {
        ...(postSlug ? { postSlug: postSlug } : { postSlug: 'example-post' }), //is optional
      },
      include: {
        user: true,
        post: true,
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
export async function POST(req: NextRequest) {
  const session: SessionType | JWT | any = await getServerSession();

  try {
    if (!session) {
      return NextResponse.json(
        { message: 'Your are not Authorized' },
        { status: 401 }
      );
    }

    const body = await req.json();

    const post = await prisma.comment.create({
      data: {
        ...body,
        userEmail: session?.user?.email,
      },
    });

    return NextResponse.json(post);
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE A COMMENT
export async function DELETE(req: NextRequest) {
  const session: SessionType | JWT | any = await getServerSession();

  try {
    if (!session) {
      return NextResponse.json(
        { message: 'Your are not Authorized' },
        { status: 401 }
      );
    }

    const body = await req.json();

    const post = await prisma.comment.delete({
      where: {
        id: body.id,
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: 'You are not Authorized' },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
