import { auth, getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// GET SINGLE POST
export async function GET(req: NextRequest, { params }: { params: any }) {
  const { articleSlug } = await params;

  const session: SessionType | JWT | any = await auth();
  console.log('🚀 ~ GET ~ session: \n\n\n\n', session);

  try {
    if (!session) {
      throw new Error('Unauthorized');
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

// UPDATE POST
export async function PUT(req: NextRequest, { params }: { params: any }) {
  const { articleSlug } = await params;

  const session: SessionType | JWT | any = await getServerSession();
  console.log('🚀 ~ PUT ~ session: =>>>>>\n\n', session);
  const body = await req.json();

  try {
    if (!session) {
      throw new Error('Unauthorized');
    }

    const updatedPost = await prisma.post.update({
      where: {
        slug: articleSlug,
        userEmail: session?.email,
      },
      data: {
        desc: body.desc,
        title: body.title,
        img: body.img,
        catSlug: body.catSlug,
        userEmail: session?.email,
        public: body.public,
      },
    });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// DELETE POST
export async function DELETE(req: NextRequest) {
  const session: SessionType | JWT | any = await getServerSession();
  const body = await req.json();

  try {
    console.log('🚀 ~ GET ~ session \n\n\n\n:', session, body);

    if (!session) {
      throw new Error('Unauthorized');
    }

    const deletedPost = await prisma.post.delete({
      where: {
        slug: body.postSlug,
        userEmail: session?.email,
      },
    });
    return NextResponse.json(deletedPost, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
