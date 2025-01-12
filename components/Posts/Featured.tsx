import React from 'react';
import { Spacer } from '../UI/spacer/spacer';
import Image from 'next/image';
import { Button } from '../UI/Button/Button';
import { Col, Row } from '../UI/Grid';
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
              <h2 data-aos='fade-up' className='text-6xl sm:hidden'>
                Welcome on Web Tech Blogs
              </h2>

              <h2 data-aos='fade-up' className='text-6xl md:hidden lg:hidden'>
                Welcome on{' '}
              </h2>
              <h2 data-aos='fade-up' className='text-6xl md:hidden lg:hidden'>
                Web Tech Blogs
              </h2>
              <p
                data-aos='fade-up'
                className=' text-baseline-400 dark:text-baseline-200 '
              >
                <strong> Discover web development journey</strong> in these
                amazing blogs.
              </p>
            </>
          )}
          <Spacer size={24} />
          <p data-aos='fade-up' className='sm:text-md md:text-xl lg:text-xl'>
            • The most viewed blog <strong>{post?.views} views </strong> •
          </p>
          <Spacer size={6} sm={3} md={3} />
        </Col>
      </Row>

      <Link href={`/blog/${post?.slug}`}>
        <Row className=' items-center'>
          <Col lg={6} md={4}>
            <div
              className='w-full lg:h-[400px] md:h-[350px] h-[200px] relative overflow-hidden rounded-md'
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
            <Spacer md={2} sm={2} />
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
              <p className='text-xl font-bold line-clamp-2'>{post?.title}</p>

              <div
                className=' line-clamp-4 sm:line-clamp-1 sm:h-[20px] text-s! dark:text-baseline-300 text-baseline-500'
                dangerouslySetInnerHTML={{
                  // parse headings and images to paragraphs
                  __html: post.desc
                    .replace(
                      /<(\/?)h[1-5](.*?)>/g,
                      '<$1p$2>' // Replace heading tags with paragraph tags
                    )
                    .replace(
                      /<img.*?>|<br\s*\/?>|<a.*?>.*?<\/a>/g,
                      '' // Replace <img>, <br>, and <a> tags with an empty string
                    ),
                }}
              />

              <Spacer size={8} sm={4} md={4} />
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
