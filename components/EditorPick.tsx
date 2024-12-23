import React from 'react';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import { Button } from './UI/Button/Button';
import { Col, Row } from './UI/Grid';
import { localDB } from '@/consts/localDB';
import { cva } from 'class-variance-authority';

const cardVariants: any = cva(
  [
    'flex pt-1 pb-1 pr-3 pl-3  items-center justify-center  rounded-full  text-white ',
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

function EditorPick() {
  return (
    <>
      <Spacer size={4} />
      <p className='text-baseline-400'>Chosen by the editor</p>
      <h5 className=' font-bold'>Editor Pick</h5>
      <Spacer size={6} />
      <Row className=' items-center'>
        {localDB.posts.map((post, index) => {
          return (
            <Col key={index} className='mb-6'>
              <div className='flex justify-between gap-4 items-center'>
                <Image
                  width={100}
                  height={100}
                  src={'/colorful.jpeg'}
                  alt={post.title}
                  className='w-16  h-16 rounded-full object-cover ring-2 dark:ring-white ring-baseline-900'
                />

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
              </div>
            </Col>
          );
        })}
        <Col lg={6} md={2}></Col>
      </Row>
    </>
  );
}

export default EditorPick;
