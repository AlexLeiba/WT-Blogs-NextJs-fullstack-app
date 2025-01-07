'use client';
import React, { useEffect, useState } from 'react';
import { Spacer } from './UI/spacer/spacer';
import { Col, Row } from './UI/Grid';
import { cva } from 'class-variance-authority';
import toast from 'react-hot-toast';
import { PostArrayType } from '@/consts/types';
import { Loader } from './UI/loader/loader';
import { format } from 'date-fns';
import { Eye } from 'lucide-react';
import Link from 'next/link';

export const cardVariants: any = cva(
  [
    'flex pt-1 pb-1 pr-3 pl-3  items-center justify-center  rounded-full  dark:text-white text-black ',
    // accessibility
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        frontend: [
          'bg-success-100  hover:bg-success-300',
          'dark:bg-success-900 dark:hover:bg-success-700',
        ],
        reactjs: [
          'bg-primary-100  hover:bg-primary-300',
          'dark:bg-primary-900 dark:hover:bg-primary-700',
        ],
        nextjs: [
          'bg-baseline-100 hover:bg-baseline-300',
          'dark:bg-baseline-900',
        ],
        javascript: [
          'bg-secondary-100  hover:bg-secondary-300',
          'dark:bg-secondary-900 dark:hover:bg-secondary-700',
        ],
        tailwind: [
          'bg-tertiary-100  hover:bg-tertiary-300',
          ' dark:bg-tertiary-900 dark:hover:bg-tertiary-700',
        ],
        css: [
          'bg-error-100  hover:bg-error-300',
          'dark:bg-error-900 dark:hover:bg-error-700',
        ],
        typescript: [
          'bg-success-100  hover:bg-success-300',
          'dark:bg-success-900 dark:hover:bg-success-700',
        ],
        html: [
          'bg-primary-100  hover:bg-primary-300',
          'dark:bg-primary-900 dark:hover:bg-primary-700',
        ],

        // BACKEND
        backend: [
          'bg-baseline-100 hover:bg-baseline-300',
          'dark:bg-baseline-900',
        ],
        nodejs: [
          'bg-primary-100  hover:bg-primary-300',
          ' dark:bg-primary-900 dark:hover:bg-primary-700',
        ],
        expressjs: [
          'bg-baseline-100 hover:bg-baseline-300',
          'dark:bg-baseline-900',
        ],
        graphql: [
          'bg-secondary-100  hover:bg-secondary-300',
          'dark:bg-secondary-900 dark:hover:bg-secondary-700',
        ],
        prisma: [
          'bg-tertiary-100  hover:bg-tertiary-300',
          'dark:bg-tertiary-900 dark:hover:bg-tertiary-700',
        ],
        mongodb: [
          'bg-error-100  hover:bg-error-300',
          'dark:bg-error-900 dark:hover:bg-error-700',
        ],
        nextauth: [
          'bg-success-100  hover:bg-success-300',
          'dark:bg-success-900 dark:hover:bg-success-700',
        ],
        database: [
          'bg-primary-100  hover:bg-primary-300',
          ' dark:bg-primary-900 dark:hover:bg-primary-700',
        ],
        sql: [
          'bg-secondary-100  hover:bg-secondary-300',
          'dark:bg-secondary-900 dark:hover:bg-secondary-700',
        ],

        auth: ['bg-baseline-100 hover:bg-baseline-300', 'dark:bg-baseline-900'],
      },
      size: {
        large: 'h-2 p-6 relative ',
        medium: 'h-4 p-5 relative ',
      },
    },
  }
);

async function getPosts() {
  try {
    const posts = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/most-popular-posts`,
      {
        cache: 'no-cache',
      }
    );

    if (!posts.ok) {
      throw new Error(posts.statusText);
    }
    //return data as JSON
    return posts.json();
  } catch (error: any) {
    toast.error(error.message);
    return { posts: [] };
  }
}

function MostPopularPosts() {
  const [postsData, setPostsData] = useState<PostArrayType>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPostsData() {
      setLoading(true);
      try {
        const posts = await getPosts();

        setPostsData(posts.posts);

        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    }

    getPostsData();
  }, []);
  return (
    <>
      <p className='text-baseline-400 '>Discover the most popular posts</p>
      <h5 className='text-xl font-bold dark:text-baseline-200 '>
        Most Popular
      </h5>
      <Spacer size={6} />

      <Row className='flex items-center dark:text-white'>
        {loading ? (
          <div className='w-full flex justify-center items-center'>
            <Spacer size={8} />
            <Loader size='medium' variant={'primary'} />
            <Spacer size={8} />
          </div>
        ) : postsData.length > 0 ? (
          postsData?.map((post, index) => {
            return (
              <Col key={index} className='mb-8'>
                <Link href={`/blog/${post.slug}`}>
                  <div data-aos='fade-up' data-aos-delay={index * 50}>
                    <div className='flex justify-between'>
                      <p className={cardVariants({ variant: post.catSlug })}>
                        {post.cat.title}
                      </p>
                      <div className='flex gap-2'>
                        <p>{post.views}</p>
                        <Eye />
                      </div>
                    </div>
                    <Spacer size={2} />
                    <p className='text-lg font-bold'>{post.title}</p>
                    <Spacer size={2} />

                    <div
                      className=' line-clamp-3'
                      dangerouslySetInnerHTML={{
                        __html: post.desc.replace(
                          /<(\/?)h[12](.*?)>|<img.*?>/g,
                          '<$1p$2>'
                        ),
                      }}
                    />

                    <div className='flex gap-2 text-s text-baseline-400'>
                      <p className='font-bold'>{post.user.name}</p>
                      <p>{format(new Date(post.createdAt), 'MMM dd yyyy')} </p>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })
        ) : (
          <Col>
            <p>No posts found</p>
          </Col>
        )}
      </Row>
    </>
  );
}

export default MostPopularPosts;
