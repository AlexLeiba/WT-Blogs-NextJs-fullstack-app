'use client';
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function AuthLinks() {
  const router = useRouter();
  const { data, status } = useSession();

  if (status === 'authenticated') {
    router.push('/');
  }
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
          <Link href='/new-article'>
            <p className='text-xs'>New article</p>
          </Link>

          <div onClick={() => signOut()} className=' cursor-pointer text-xs'>
            <p>Logout</p>
          </div>
        </>
      ) : (
        <Link href='/login'>
          <p className='text-xs'>Login</p>
        </Link>
      )}
    </div>
  );
}

export default AuthLinks;
