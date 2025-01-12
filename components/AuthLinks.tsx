'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

function AuthLinks() {
  const [isOpen, setIsOpen] = useState(false);
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
    { name: 'About', link: '/about', linkName: '/about' },
    {
      name: 'My articles',
      link: status === 'authenticated' ? '/my-articles?page=1' : '/sign-in',
      linkName: '/my-articles',
    },
  ];

  // ON MOBILE
  function handleMobieNav(path: string) {
    router.push(`${path}`);
    setIsOpen(false);
    window.document.body.style.overflow = 'auto';
  }
  function handleMobileMenu(value: boolean) {
    if (value) {
      window.document.body.style.overflow = 'hidden';
    } else {
      window.document.body.style.overflow = 'auto';
    }

    setIsOpen(value);
  }
  return (
    <>
      <div className='flex gap-4 dark:text-baseline-200 items-center sm:hidden'>
        {navLinks.map((navLink, index) => {
          return (
            <Link key={index} href={navLink.link}>
              <p
                className={cn(
                  'text-sm  dark:text-baseline-100 dark:hover:text-baseline-200 hover:text-baseline-500',
                  navLink.linkName === pathname &&
                    'font-bold dark:text-white text-black'
                )}
              >
                {navLink.name}
              </p>

              <div
                className={cn(
                  'w-[0%] h-[1px] dark:bg-white bg-black transition-all ease-in-out',
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
                      ' transition-all text-sm  dark:text-baseline-100 dark:hover:text-baseline-200 hover:text-baseline-500 ',
                      '/my-profile' === pathname &&
                        'font-bold dark:text-white text-black '
                    )}
                  >
                    Profile
                  </p>
                  <div
                    className={cn(
                      'w-[0%] h-[1px] dark:bg-white bg-black transition-all ease-in-out',
                      '/my-profile' === pathname && 'w-full'
                    )}
                  />
                </Link>
                <div
                  onClick={() => signOut({ redirectTo: '/sign-in' })}
                  className=' cursor-pointer '
                >
                  <p className='text-sm` dark:text-baseline-100 dark:hover:text-baseline-200  hover:text-baseline-500 text-black font-bold'>
                    Logout
                  </p>
                </div>
              </>
            ) : (
              <Link href='/sign-in'>
                <p className='text-sm dark:text-baseline-200 dark:hover:text-white hover:text-baseline-500 text-black font-bold'>
                  Sign in
                </p>
              </Link>
            )}
          </>
        )}
      </div>

      {/* MOBILE MENU */}
      <div className='lg:hidden md:hidden '>
        {isOpen ? (
          <X
            className='cursor-pointer'
            onClick={() => handleMobileMenu(false)}
          />
        ) : (
          <Menu
            className='cursor-pointer'
            onClick={() => handleMobileMenu(true)}
          />
        )}
        {isOpen && (
          <div className=' fixed top-[56px] left-0 right-0 z-50 bg-baseline-100 dark:bg-baseline-900 h-full w-full text-center flex justify-center items-center flex-col gap-12'>
            <div className='flex gap-8 items-center'>
              <Link href={'href="https://github.com/AlexLeiba"'}>
                <Github width={20} height={20} cursor={'pointer'} />{' '}
              </Link>
              <Link href={'mailto:alexleiba@gmail.com'}>
                <Mail width={20} height={20} cursor={'pointer'} />{' '}
              </Link>
              <Link
                href={
                  'https://www.linkedin.com/in/alex-leiba-9205801ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
                }
              >
                <Linkedin width={20} height={20} cursor={'pointer'} />
              </Link>
            </div>
            {navLinks.map((navLink, index) => {
              return (
                <div
                  key={index}
                  className='cursor-pointer'
                  onClick={() => handleMobieNav(navLink.link)}
                >
                  <h5
                    className={cn(
                      'text-xl  dark:text-baseline-100 dark:hover:text-baseline-200 hover:text-baseline-500 ',
                      navLink.linkName === pathname &&
                        'font-bold dark:text-white text-black'
                    )}
                  >
                    {navLink.name}
                  </h5>

                  <div
                    className={cn(
                      'w-[0%] h-[1px] dark:bg-white bg-black transition-all ease-in-out',
                      navLink.linkName === pathname && 'w-full'
                    )}
                  />
                </div>
              );
            })}

            {status !== 'loading' && (
              <>
                {status === 'authenticated' ? (
                  <>
                    <div
                      className='cursor-pointer'
                      onClick={() => handleMobieNav('my-profile')}
                    >
                      <h5
                        className={cn(
                          ' transition-all text-xl dark:text-baseline-100 dark:hover:text-baseline-200 hover:text-baseline-500 ',
                          '/my-profile' === pathname &&
                            'font-bold dark:text-white text-black '
                        )}
                      >
                        Profile
                      </h5>
                      <div
                        className={cn(
                          'w-[0%] h-[1px] dark:bg-white bg-black transition-all ease-in-out',
                          '/my-profile' === pathname && 'w-full'
                        )}
                      />
                    </div>
                    <div
                      onClick={() => signOut({ redirectTo: '/sign-in' })}
                      className=' cursor-pointer '
                    >
                      <h5 className='text-xl dark:text-baseline-100 dark:hover:text-baseline-200  hover:text-baseline-500 text-black font-bold'>
                        Logout
                      </h5>
                    </div>
                  </>
                ) : (
                  <div
                    className='cursor-pointer'
                    onClick={() => handleMobieNav('sign-in')}
                  >
                    <h5 className='text-xl dark:text-baseline-200 dark:hover:text-white hover:text-baseline-500 text-black font-bold'>
                      Sign in
                    </h5>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default AuthLinks;
