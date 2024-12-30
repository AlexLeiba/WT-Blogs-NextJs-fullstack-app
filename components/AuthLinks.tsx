'use client';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

function AuthLinks() {
  // const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'authenticated') {
    // router.push('/');
  }
  return (
    <div className='flex gap-4 dark:text-baseline-200'>
      <Link href='/'>
        <p className='text-xs'>Blogs</p>
      </Link>
      <Link href='/contact'>
        <p className='text-xs'>Contact</p>
      </Link>
      <Link href='/about'>
        <p className='text-xs'>About</p>
      </Link>

      <Link
        href={status === 'authenticated' ? '/my-articles?page=1' : '/sign-in'}
      >
        <p className='text-xs'>My articles</p>
      </Link>

      {status !== 'loading' && (
        <>
          {status === 'authenticated' ? (
            <>
              <Link href={'/my-profile'}>
                <p className='text-xs'>Profile</p>
              </Link>
              <div
                onClick={() => signOut({ redirectTo: '/sign-in' })}
                className=' cursor-pointer text-xs'
              >
                <p>Logout</p>
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
