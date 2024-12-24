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
  type?: 'home' | 'category';
}) {
  const POSTS_PER_PAGE = 5;

  const router = useRouter();
  return (
    <Row>
      <Col className='flex justify-between'>
        <Button
          disabled={page === 1}
          onClick={() => {
            type === 'category'
              ? router.push(`/blog?category=${category}&page=${page - 1}`)
              : router.push(`/?page=${page - 1}`);
          }}
          variant={'baseline'}
          size={'medium'}
          className={'dark:text-white'}
        >
          Previous
        </Button>

        <Button
          disabled={numberOfPosts < page * POSTS_PER_PAGE}
          onClick={() => {
            type === 'category'
              ? router.push(`/blog?category=${category}&page=${page + 1}`)
              : router.push(`/?page=${page + 1}`);
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
