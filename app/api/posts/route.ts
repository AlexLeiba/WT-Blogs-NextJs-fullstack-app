import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET ALL PUBLIC POSTS / GET POSTS BY CATEGORY / GET MOST POPULAR POSTS
export async function GET(req: NextRequest) {
  const POST_PER_PAGE = 5;
  const { searchParams } = new URL(req.url);

  const page: number = parseInt(searchParams.get('page') as string) || 1;
  const categorySlug: string = (searchParams.get('category') as string) || '';

  try {
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany({
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          // FILTER BY PUBLIC ONLY
          public: { equals: true },
          // FILTER BY CATEGORY DOMAIN OR CATEGORY SLUG
          ...(categorySlug === 'frontend' || categorySlug === 'backend' //or filter by domain
            ? { catDomain: categorySlug }
            : categorySlug
            ? { catSlug: categorySlug } //or filter by category slug
            : {}), //is optional
        },
        include: {
          cat: true,
          user: true,
        },
      }),
      // COUNT ALL POSTS FILTERED BY CATEGORY
      prisma.post.count({
        where: {
          ...(categorySlug === 'frontend' || categorySlug === 'backend' //or filter by domain
            ? { catDomain: categorySlug }
            : categorySlug
            ? { catSlug: categorySlug } //or filter by category slug
            : {}), //is optional
        },
      }),
    ]);

    return NextResponse.json({ posts, count }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
