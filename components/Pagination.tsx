'use client';
import React from 'react';
import { Col, Row } from './UI/Grid';
import { Button } from './UI/Button/Button';
import { useRouter } from 'next/navigation';

function Pagination({
  page,
  numberOfPosts,
  type,
  category,
}: {
  page: number;
  numberOfPosts: number;
  category?: string;
  type?: 'home' | 'category' | 'my-articles';
}) {
  const POSTS_PER_PAGE = 5;

  const router = useRouter();

  function handleNavigations(navType: 'previous' | 'next') {
    if (navType === 'previous') {
      switch (type) {
        case 'category':
          return router.push(`/blog?category=${category}&page=${page - 1}`);
        case 'home':
          return router.push(`/?page=${page - 1}`);
        case 'my-articles':
          return router.push(`/my-articles?page=${page - 1}`);

        default:
          return router.push(`/?page=${page - 1}`);
      }
    } else if (navType === 'next') {
      switch (type) {
        case 'category':
          return router.push(`/blog?category=${category}&page=${page + 1}`);
        case 'home':
          return router.push(`/?page=${page + 1}`);
        case 'my-articles':
          return router.push(`/my-articles?page=${page + 1}`);

        default:
          return router.push(`/?page=${page + 1}`);
      }
    }
  }
  return (
    <Row>
      <Col className='flex justify-between'>
        <Button
          disabled={page === 1}
          onClick={() => {
            handleNavigations('previous');
          }}
          variant={'baseline'}
          size={'medium'}
          className={'dark:text-white'}
        >
          Previous
        </Button>

        <Button
          disabled={numberOfPosts - 1 < page * POSTS_PER_PAGE}
          onClick={() => {
            handleNavigations('next');
          }}
          variant={'baseline'}
          size={'medium'}
          className={'dark:text-white'}
        >
          Next
        </Button>
      </Col>
    </Row>
  );
}

export default Pagination;
