import { getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// FETCH ALL MY ARTICLES
export async function GET(req: NextRequest, { params }: { params: any }) {
  const { articleSlug } = params;
  //   const { searchParams } = new URL(req.url);

  //   const postSlug: string = (searchParams.get('postSlug') as string) || '';
  //   console.log('🚀 ~ GET ~ postSlug: \n\n\n', postSlug);
  const session: SessionType | JWT | any = await getServerSession(req);

  try {
    console.log('🚀 ~ GET ~ session \n\n\n\n:', session);

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const post = await prisma.post.findUnique({
      where: {
        slug: articleSlug,
        userEmail: session?.email,
      },
    });

    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
