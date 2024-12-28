import { getServerSession } from '@/auth';
import { SessionType } from '@/consts/types';
import { prisma } from '@/prisma';
import { JWT } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

// GET SINGLE POST
export async function GET(req: NextRequest, { params }: { params: any }) {
  console.log('Request headers:\n\n\n\n', req.headers);
  const { articleSlug } = params;
  console.log('🚀 ~ articleSlug \n\n\n\n\n:', articleSlug);

  const session: SessionType | JWT | any = await getServerSession(req);

  try {
    console.log('🚀 ~ GET ~ session \n\n\n\n:', session);

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
  const { articleSlug } = params;

  const session: SessionType | JWT | any = await getServerSession(req);
  const body = await req.json();

  console.log('🚀 ~ PUT ~ body:\n\n\n\n', body);

  try {
    console.log('🚀 ~ GET ~ session \n\n\n\n:', session);

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
        public: body.public || true,
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
  const session: SessionType | JWT | any = await getServerSession(req);
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
