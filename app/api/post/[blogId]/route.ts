import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET SINGLE POST
export async function POST(req: NextRequest, { params }: { params: any }) {
  const { blogId } = await params;
  const { userEmail } = await req.json();

  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: blogId, // Case-insensitive comparison
      },
      include: {
        user: true,
        cat: true,
      },
    });

    if (!post) {
      return NextResponse.json(
        { message: 'Something went wrong, please try again later' },
        { status: 404 }
      );
    }

    // INCREMENT VIEWS ONLY WHEN USER IS LOGGED IN AND THE POST IS NOT HIS
    if (userEmail) {
      if (post && post.userEmail !== userEmail) {
        await prisma.post.update({
          where: {
            slug: blogId, // Case-insensitive comparison
            // public: true,
          },
          include: {
            user: true,
            cat: true,
          },
          data: {
            views: { increment: 1 },
          },
        });
      }
    }
    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.log('🚀 ~ \n\n\n\n\n post:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
