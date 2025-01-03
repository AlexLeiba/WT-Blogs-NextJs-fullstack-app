'use client';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

function AuthLinks() {
  const pathname = usePathname();
  const router = useRouter();

  const { status } = useSession();

  if (status === 'unauthenticated') {
    if (pathname === '/my-articles') {
      router.push('/sign-in');
    }
  }

  const navLinks = [
    { name: 'Blogs', link: '/', linkName: '/' },
    { name: 'Contact', link: '/contact', linkName: '/contact' },
    { name: 'About', link: '/about', linkName: '/about' },
    {
      name: 'My articles',
      link: status === 'authenticated' ? '/my-articles?page=1' : '/sign-in',
      linkName: '/my-articles',
    },
  ];
  return (
    <div className='flex gap-4 dark:text-baseline-200'>
      {navLinks.map((navLink, index) => {
        return (
          <Link key={index} href={navLink.link}>
            <p
              className={cn(
                'text-xs hover:text-white',
                navLink.linkName === pathname && 'font-bold'
              )}
            >
              {navLink.name}
            </p>

            <div
              className={cn(
                'w-[0%] h-[1px] bg-white transition-all ease-in-out',
                navLink.linkName === pathname && 'w-full'
              )}
            />
          </Link>
        );
      })}

      {status !== 'loading' && (
        <>
          {status === 'authenticated' ? (
            <>
              <Link href={'/my-profile'}>
                <p
                  className={cn(
                    'text-xs hover:text-white',
                    '/my-profile' === pathname && 'font-bold'
                  )}
                >
                  Profile
                </p>
                <div
                  className={cn(
                    'w-[0%] h-[1px] bg-white transition-all ease-in-out',
                    '/my-profile' === pathname && 'w-full'
                  )}
                />
              </Link>
              <div
                onClick={() => signOut({ redirectTo: '/sign-in' })}
                className=' cursor-pointer text-xs'
              >
                <p className=' hover:text-white'>Logout</p>
              </div>
            </>
          ) : (
            <Link href='/sign-in'>
              <p className='text-xs'>Sign in</p>
            </Link>
          )}
        </>
      )}
    </div>
  );
}

export default AuthLinks;
