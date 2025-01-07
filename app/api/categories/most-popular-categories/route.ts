import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const devCategoryDomain: string = searchParams.get('category') as string;

    const categories = await prisma.category.findMany({
      take: 6,
      where: {
        domain: {
          equals: devCategoryDomain ? devCategoryDomain : 'frontend',
        },
      },
      orderBy: {
        Posts: {
          _count: 'desc', // Order by the number of posts in descending order
        },
      },
      include: {
        _count: {
          select: { Posts: true }, // Include the count of posts
        },
        Posts: true, // Optionally include the posts themselves
      },
    });

    const sortedCategories = categories
      .map((category) => ({
        ...category,
        maxViews: category.Posts.length ? category.Posts[0].views : 0, // Take the highest view count
      }))
      .sort((a, b) => b.maxViews - a.maxViews) // Sort categories by maxViews
      .slice(0, 6); // Take the top 6 categories

    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
