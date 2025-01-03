import cloudinary from '@/lib/cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const file = await req.json();

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.img, {
      folder: 'wt-blogs', // Optional: Organize uploads into a specific folder
      use_filename: true,
      unique_filename: false,
    });

    return NextResponse.json({
      status: 200,
      success: true,
      url: result.secure_url,
      result,
    });
  } catch (error: any) {
    console.log('🚀 ~ POST ~ error:\n\n\n\n\n', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
