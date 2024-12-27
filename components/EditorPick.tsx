'use client';
import React, { useEffect, useState } from 'react';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import { Button } from './UI/Button/Button';
import { Col, Row } from './UI/Grid';
import { localDB } from '@/consts/localDB';
import { cva } from 'class-variance-authority';
import toast from 'react-hot-toast';
import { PostArrayType } from '@/consts/types';
import { format } from 'date-fns';
import { Loader } from './UI/loader/loader';

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
        react: ['bg-primary-200  ', 'dark:bg-primary-900 '],
        nextjs: ['bg-baseline-200 ', 'dark:bg-baseline-900'],
        javascript: ['bg-secondary-200  ', 'dark:bg-secondary-900 '],
        tailwind: ['bg-tertiary-200  ', ' dark:bg-tertiary-900 '],
        css: ['bg-error-200  ', 'dark:bg-error-900 '],
        typescript: ['bg-success-200 ', 'dark:bg-success-900 '],

        // BACKEND
        nodejs: ['bg-primary-200  ', ' dark:bg-primary-900 '],
        expressjs: ['bg-baseline-200 ', 'dark:bg-baseline-900'],
        graphql: ['bg-secondary-200  ', 'dark:bg-secondary-900 '],
        prisma: ['bg-tertiary-200  ', 'dark:bg-tertiary-900 '],
        mongodb: ['bg-error-200  ', 'dark:bg-error-900 '],
        nextauth: ['bg-success-200  ', 'dark:bg-success-900'],
      },
      size: {
        large: 'h-2 p-6 relative ',
        medium: 'h-4 p-5 relative ',
      },
    },
  }
);

async function getPosts(postEditorEmail: string) {
  const posts = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/most-popular-posts-viewed-by-editor/${postEditorEmail}`,
    {
      cache: 'no-cache',
    }
  );

  if (!posts.ok) {
    return toast.error(posts.statusText);
  }
  //return data as JSON
  return posts.json();
}

function EditorPick({ postEditorEmail }: { postEditorEmail: string }) {
  const [postsData, setPostsData] = useState<PostArrayType>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getPostsData() {
      setLoading(true);
      try {
        const posts = await getPosts(postEditorEmail);

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
      <Spacer size={4} />
      <p className='text-baseline-400'>
        Popular posts written by the current editor
      </p>
      <h5 className=' font-bold'>Editor Picks</h5>
      <Spacer size={6} />
      <Row className='flex items-center'>
        {loading ? (
          <div className='w-full flex justify-center items-center'>
            <Spacer size={8} />
            <Loader size='medium' variant={'primary'} />
            <Spacer size={8} />
          </div>
        ) : postsData.length > 0 ? (
          postsData?.map((post, index) => {
            return (
              <Col key={index} className='mb-6'>
                <div className='flex  gap-4 items-center'>
                  {post.user.image && (
                    <Image
                      width={100}
                      height={100}
                      src={post.user.image}
                      alt={post.title}
                      className='w-16  h-16 rounded-full object-cover ring-2 dark:ring-white ring-baseline-900'
                    />
                  )}

                  <div>
                    <div className='flex justify-start'>
                      <p className={cardVariants({ variant: post.catSlug })}>
                        {post.cat.title}
                      </p>
                    </div>
                    <Spacer size={2} />
                    <p className='text-lg font-bold'>{post.title}</p>
                    <Spacer size={2} />

                    <div
                      className=' line-clamp-3'
                      dangerouslySetInnerHTML={{ __html: post.desc }}
                    />
                    <div className='flex gap-2 text-s text-baseline-400'>
                      <p className='font-bold'>{post.user.name}</p>
                      <p>{format(new Date(post.createdAt), 'MMM dd yyyy')} </p>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })
        ) : (
          <Col lg={6} md={2}>
            <p>No articles found</p>
          </Col>
        )}
      </Row>
    </>
  );
}

export default EditorPick;
