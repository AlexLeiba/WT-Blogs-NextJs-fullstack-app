import React from 'react';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import { Button } from './UI/Button/Button';
import { Col, Row } from './UI/Grid';
import toast from 'react-hot-toast';
import { SinglePostType } from '@/consts/types';
import Link from 'next/link';
import { format } from 'date-fns';

async function Featured({ type }: { type: 'category' | 'home' }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/most-viewed-post`,
    {
      cache: 'no-cache',
    }
  );

  if (!response?.ok) {
    toast.error(response.statusText);
    return;
  }
  const responseData = await response.json();

  const post: SinglePostType = responseData.post;

  return (
    <div>
      <Row>
        <Col lg={9}>
          {type === 'home' && (
            <>
              <h2 data-aos='fade-up' className=' '>
                Welcome on Web Tech Blogs
              </h2>
              <p
                data-aos='fade-up'
                className='text-xl text-baseline-400 dark:text-baseline-200 '
              >
                <strong> Discover web development journey</strong> in these
                amazing blogs.
              </p>
            </>
          )}
          <Spacer size={12} />
          <h5 data-aos='fade-up'>
            The most viewed blog post with <strong>{post?.views}</strong> views
          </h5>
          <Spacer size={6} />
        </Col>
      </Row>

      <Link href={`/blog/${post?.slug}`}>
        <Row className=' items-center'>
          <Col lg={6} md={2}>
            <div
              className='w-full h-[400px] relative overflow-hidden rounded-md'
              data-aos='fade-up'
              data-aos-delay={50}
            >
              <Image
                className='w-full object-cover'
                src={post?.img || '/default-cover-image.webp'}
                alt='colorful'
                fill
              />
            </div>
          </Col>
          <Col lg={6} md={2}>
            <div
              className='flex gap-2 text-s text-baseline-400'
              data-aos='fade-up'
              data-aos-delay={100}
            >
              <p className=' text-baseline-400 font-bold'>{post?.user?.name}</p>
              {post?.createdAt && (
                <p>{format(new Date(post?.createdAt), 'MMM dd yyyy')}</p>
              )}
              <p className=' text-error-500'>{post?.cat?.title}</p>
            </div>
            <div data-aos='fade-up' data-aos-delay={200}>
              <h5 className='font-bold'>{post?.title}</h5>

              <div
                className=' line-clamp-4'
                dangerouslySetInnerHTML={{
                  __html: post?.desc ? post.desc : '',
                }}
              />

              <Spacer size={8} />
              <Button
                variant={'primary'}
                size={'medium'}
                className={'dark:text-white'}
              >
                Read More
              </Button>
            </div>
          </Col>
        </Row>
      </Link>
    </div>
  );
}

export default Featured;
