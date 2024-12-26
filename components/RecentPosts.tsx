import React from 'react';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import { Button } from './UI/Button/Button';
import { Col, Row } from './UI/Grid';
import Link from 'next/link';
import { PostArrayType } from '@/consts/types';
import { format } from 'date-fns';

async function RecentPosts({
  posts,
  type,
  numberOfPosts,
}: {
  posts: PostArrayType;
  type?: 'home' | 'category';
  numberOfPosts?: number;
}) {
  return (
    <>
      <div className='flex justify-between items-center font-bold'>
        <h5>
          {type === 'category' ? `Posts ${numberOfPosts}` : 'Recent posts'}{' '}
        </h5>
        {type === 'category' && (
          <Link href='/'>
            <Button variant={'secondary'} className='font-bold '>
              All posts
            </Button>
          </Link>
        )}
      </div>
      <Spacer size={6} />
      <Row className=' items-center'>
        {posts.length > 0 ? (
          posts?.map((post, index) => {
            return (
              <Col key={index} lg={12} md={2} className='mb-6'>
                <Link href={`blog/${post.slug}`}>
                  <Row>
                    <Col lg={6} md={2}>
                      {post.img && (
                        <div className='h-[200px] w-full relative'>
                          <Image
                            className='w-full object-contain'
                            src={post.img}
                            alt={post.title}
                            fill
                          />
                        </div>
                      )}
                    </Col>
                    <Col lg={6} md={2} className='flex  items-center'>
                      <div>
                        <div className='flex gap-2 text-s text-baseline-400'>
                          <p className=' text-baseline-400 font-bold'>
                            {post.user?.name}
                          </p>
                          -
                          <p>
                            {format(new Date(post.createdAt), 'MMM dd yyyy')}
                          </p>{' '}
                          -<p className=' text-error-500'>{post.cat?.title}</p>
                          {/* <p>{post.cat.title}</p> */}
                        </div>
                        <Spacer size={2} />
                        <p className='text-xl font-bold'>{post.title}</p>

                        <p className='line-clamp-4'>{post.desc}</p>

                        <Spacer size={2} />

                        <Button
                          variant={'link'}
                          size={'medium'}
                          // className={'dark:text-white'}
                        >
                          Read More
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Link>
              </Col>
            );
          })
        ) : (
          <Col>
            <Spacer size={8} />
            <p className='text-xl font-bold'>
              No posts found, try with other categories
            </p>
          </Col>
        )}
      </Row>
    </>
  );
}

export default RecentPosts;
