import React from 'react';
import { Spacer } from './UI/spacer/spacer';
import { Col, Row } from './UI/Grid';
import { localDB } from '@/consts/localDB';
import { cva } from 'class-variance-authority';

const cardVariants: any = cva(
  [
    'flex pt-1 pb-1 pr-3 pl-3  items-center justify-center  rounded-full  text-white ',
    // accessibility
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-primary-400  ', ' dark:bg-primary-900 '],
        baseline: ['bg-baseline-400 ', 'dark:bg-baseline-900'],
        secondary: ['bg-secondary-400  ', ' dark:bg-secondary-900 '],
        tertiary: ['bg-tertiary-400  ', ' dark:bg-tertiary-900 '],
        error: ['bg-error-400  ', ' dark:bg-error-900 '],
        success: ['bg-success-400  ', ' dark:bg-success-900 '],
      },
    },
  }
);

function MostPopularPosts() {
  return (
    <>
      <p className='text-baseline-400'>Discover the most popular posts</p>
      <h5 className='text-xl font-bold'>Most Popular</h5>
      <Spacer size={6} />
      <Row className=' items-center'>
        {localDB.posts.map((post, index) => {
          return (
            <Col key={index} className='mb-6'>
              <div>
                <div className='flex justify-start'>
                  <p className={cardVariants({ variant: post.category })}>
                    {post.category}
                  </p>
                </div>
                <Spacer size={2} />
                <p className='text-lg font-bold'>{post.title}</p>
                <Spacer size={2} />
                <p className=' line-clamp-3'>{post.description}</p>
                <div className='flex gap-2 text-s text-baseline-400'>
                  <p className='font-bold'>{post.author}</p>
                  <p>{post.date}</p>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default MostPopularPosts;
