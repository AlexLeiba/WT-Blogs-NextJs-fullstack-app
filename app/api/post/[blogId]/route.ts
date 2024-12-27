import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

// GET SINGLE POST
export async function GET(req: Request, { params }: { params: any }) {
  const { blogId } = params;

  try {
    const post = await prisma.post.update({
      // will get the post and increment the views
      where: {
        slug: blogId, // Case-insensitive comparison
      },
      include: {
        user: true,
        cat: true,
      },
      data: {
        views: { increment: 1 },
      },
    });
    console.log('🚀 ~ \n\n\n\n\n post:', post);

    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.log('🚀 ~ \n\n\n\n\n post:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
