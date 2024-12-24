export { auth as middleware } from '@/auth';

// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const token = request.cookies.get('token');

//   if (!token) {
//     // Redirect to login page if token is missing
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   return NextResponse.next(); // Continue to the requested page
// }

// export const config = {
//   matcher: '/dashboard/:path*', // Apply middleware to specific routes
// };
