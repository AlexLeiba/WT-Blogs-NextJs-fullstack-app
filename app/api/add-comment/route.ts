import { getServerSession } from '@/auth';
import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const session = await getServerSession(req);

  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get('postSlug') as string;

  const data = await req.json();

  try {
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const comment = await prisma.comment.create({
      data: {
        ...data,
        postSlug,
      },
    });

    return NextResponse.json({ comment }, { status: 200 });
  } catch (error: any) {
    console.log('🚀 ~ \n\n\n\n\n comment:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
