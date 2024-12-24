import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const POST_PER_PAGE = 5;
  const { searchParams } = new URL(req.url);

  const page: number = parseInt(searchParams.get('page') as string) || 1;
  const categorySlug: string = (searchParams.get('category') as string) || '';
  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where: {
          ...(categorySlug ? { catSlug: categorySlug } : {}), //is optional
        },
      }),
      prisma.post.count({
        where: {
          ...(categorySlug ? { catSlug: categorySlug } : {}), //is optional
        },
      }),
    ]);

    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
