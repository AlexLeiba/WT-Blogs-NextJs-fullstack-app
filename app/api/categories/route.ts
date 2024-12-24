import { prisma } from '@/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories, { status: 200 });
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// export function GET(req: Request) {
//   const { slug } = req.query;
//   const category = await prisma.category.findUnique({
//     where: {
//       slug,
//     },
//     include: {
//       Posts: true,
//     },
//   });

//   return category;
// }

// export function PUT(req: Request) {
//   const { title, img, slug } = await req.json();
//   const category = await prisma.category.update({
//     where: {
//       slug,
//     },
//     data: {
//       title,
//       img,
//     },
//   });

//   return category;
// }

// export function DELETE(req: Request) {
//   const { slug } = req.query;
//   const category = await prisma.category.delete({
//     where: {
//       slug,
//     },
//   });

//   return category;
// }
