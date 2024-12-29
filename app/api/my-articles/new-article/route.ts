import { getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from '@auth/core/jwt';
import { NextRequest, NextResponse } from 'next/server';

// CREATE NEW POST

export async function POST(req: NextRequest) {
  const session: SessionType | JWT | any = await getServerSession();
  console.log('🚀 ~ POST ~ session=>>>>>>XXXXXXX:', session);

  const body = await req.json();
  console.log('🚀 ~ POST ~ body:XXXXXXXXXXXX', body);
  try {
    if (!session) {
      return NextResponse.json({ message: 'Not Authorized' }, { status: 401 });
    }

    console.log(
      '🚀 ~ \n\n\n\n POST ~ body=>>>>:',
      body,
      '\n\n\n\n session=>>>>',
      session
    );

    const post = await prisma.post.create({
      data: {
        ...body,
        // desc: body.desc,
        // title: body.title,
        // img: body.img,
        // catSlug: body.catSlug,
        // public: body.public,

        userEmail: session.user?.email, //this is the user email who created the post
      },
    });

    console.log('Post created:', post);
    return NextResponse.json(post, { status: 200 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
