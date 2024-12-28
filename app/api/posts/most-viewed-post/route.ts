import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

// GET SINGLE POST
export async function GET(req: Request) {
  try {
    const post = await prisma.post.findFirst({
      where: {
        views: {
          gt: 0,
        },
        // public: true,
      },
      orderBy: {
        views: 'desc',
      },
      include: {
        user: true,
        cat: true,
      },
      take: 1,
    });

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.log('🚀 ~ \n\n\n\n\n post:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
