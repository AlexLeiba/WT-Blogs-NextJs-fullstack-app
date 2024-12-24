import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const post = await prisma.post.create({
      data: {
        slug: 'example-post12',
        title: 'Example Post12',
        desc: 'This is an example description',
        img: '/colorful.jpeg',
        views: 7,
        catSlug: 'nextjs', // Must match an existing Category slug
        userEmail: 'alexleiba13@gmail.com', // Must match an existing User email
      },
    });

    console.log('Post created:', post);
    return NextResponse.json(post);
  } catch (error) {
    console.error('Error creating post:', error);
  } finally {
    await prisma.$disconnect();
  }
}
