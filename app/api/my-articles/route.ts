import { getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// FETCH ALL MY ARTICLES
export async function GET(req: NextRequest) {
  const session: SessionType | JWT | any = await getServerSession(req);

  const POST_PER_PAGE = 5;
  const { searchParams } = new URL(req.url);

  const page: number = parseInt(searchParams.get('page') as string) || 1;

  try {
    console.log('🚀 ~ GET ~ session \n\n\n\n:', session);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        where: {
          userEmail: session?.email,
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
          userEmail: session?.email,
        },
      }),
    ]);

    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
