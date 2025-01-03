import { getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// FETCH ALL MY ARTICLES
export async function GET(req: NextRequest) {
  const session: SessionType | JWT | any = await getServerSession();

  try {
    const POST_PER_PAGE = 5;
    const { searchParams } = new URL(req.url);

    const page: number = parseInt(searchParams.get('page') as string) || 1;

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        where: {
          userEmail: session.user?.email,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        include: {
          cat: true,
          user: true,
        },
      }),
      prisma.post.count({
        where: {
          userEmail: session.user?.email,
        },
      }),
    ]);

    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

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

    return NextResponse.json({ post }, { status: 200 });
  } catch (error: any) {
    console.log('🚀 ~ \n\n\n\n\n post:', error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
