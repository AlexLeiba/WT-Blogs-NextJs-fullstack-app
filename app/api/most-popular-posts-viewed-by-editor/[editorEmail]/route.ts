import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: any }) {
  const { editorEmail } = await params;
  console.log('🚀 ~ GET ~ editorEmail: \n\n\n\n', editorEmail);
  try {
    const [posts] = await prisma.$transaction([
      prisma.post.findMany({
        orderBy: {
          views: 'desc', // Sort by the number of views in descending order
        },
        take: 5,
        where: {
          public: { equals: true },
          userEmail: editorEmail,
          // public: true,
        },
        include: {
          cat: true,
          user: true,
        },
      }),
    ]);

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
