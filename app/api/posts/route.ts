import { prisma } from '@/prisma';
import { NextRequest, NextResponse } from 'next/server';

// GET ALL PUBLIC POSTS
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
          public: { equals: true },
          ...(categorySlug ? { catSlug: categorySlug } : {}), //is optional
        },
        include: {
          cat: true,
          user: true,
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

// // UPDATE POST
// export async function PUT(req: NextRequest) {
//   const session: SessionType | JWT | any = await getServerSession();
//   console.log('🚀 ~ POST ~ session:', session);

//   try {
//     if (!session) {
//       return NextResponse.json(
//         { message: 'You must be logged in to create a post' },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();

//     console.log(
//       '🚀 ~ \n\n\n\n POST ~ body=>>>>:',
//       body,
//       '\n\n\n\n session=>>>>',
//       session
//     );

//     const post = await prisma.post.create({
//       data: {
//         ...body,
//         userEmail: session?.email, //this is the user email who created the post
//       },
//     });

//     console.log('Post created:', post);
//     return NextResponse.json(post, { status: 200 });
//   } catch (error: any) {
//     console.error('Error creating post:', error);
//     return NextResponse.json({ message: error.message }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }
