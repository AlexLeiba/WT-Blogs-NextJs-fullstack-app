import React from 'react';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import { Button } from './UI/Button/Button';
import { Col, Row } from './UI/Grid';
import { localDB } from '@/consts/localDB';
import Link from 'next/link';

function RecentPosts() {
  return (
    <>
      <div className='flex justify-between items-center font-bold'>
        <h5>Recent posts</h5>
        <Button variant={'secondary'} className='  font-bold '>
          All posts
        </Button>
      </div>
      <Spacer size={6} />
      <Row className=' items-center'>
        {localDB.posts.map((post, index) => {
          return (
            <React.Fragment key={index}>
              <Col lg={6} md={2} className='mb-6'>
                <Image
                  className='w-full'
                  src={'/colorful.jpeg'}
                  alt='colorful'
                  width={400}
                  height={400}
                />
              </Col>
              <Col lg={6} md={2}>
                <div>
                  <div className='flex gap-2 text-s text-baseline-400'>
                    <p>{post.date}</p>
                    <p>{post.category}</p>
                  </div>
                  <Spacer size={2} />
                  <p className='text-xl font-bold'>{post.title}</p>

                  <p className='line-clamp-4'>{post.description}</p>

                  <Spacer size={2} />
                  <Link href={post.link}>
                    <Button
                      variant={'link'}
                      size={'medium'}
                      // className={'dark:text-white'}
                    >
                      Read More
                    </Button>
                  </Link>
                </div>
              </Col>
            </React.Fragment>
          );
        })}
      </Row>
    </>
  );
}

export default RecentPosts;
