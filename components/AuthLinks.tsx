import Link from 'next/link';
import React from 'react';

function AuthLinks() {
  const status: 'authenticated' | 'unauthenticated' = 'unauthenticated';
  return (
    <div className='flex gap-4 dark:text-baseline-200'>
      <Link href='/'>
        <p className='text-xs'>Homepage</p>
      </Link>
      <Link href='/'>
        <p className='text-xs'>Contact</p>
      </Link>
      <Link href='/'>
        <p className='text-xs'>About</p>
      </Link>
      {status === 'authenticated' ? (
        <>
          <Link href='/'>
            <p className='text-xs'>New article</p>
          </Link>

          <p className=' cursor-pointer text-xs'>Logout</p>
        </>
      ) : (
        <Link href='/'>
          <p className='text-xs'>Login</p>
        </Link>
      )}
    </div>
  );
}

export default AuthLinks;
