import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [posts] = await prisma.$transaction([
      prisma.post.findMany({
        orderBy: {
          views: 'desc', // Sort by the number of views in descending order
        },
        take: 5,
        include: {
          cat: true,
          user: true,
        },
        // where: {
        //   public: true,
        // },
      }),
    ]);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
