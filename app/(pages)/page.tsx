import React from 'react';
import Categories from '@/components/Categories';
import PopularCategories from '@/components/PopularCategories';
import Featured from '@/components/Featured';
import MostPopularPosts from '@/components/MostPopularPosts';
import Pagination from '@/components/Pagination';
import RecentPosts from '@/components/RecentPosts';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import toast from 'react-hot-toast';
import { PostType } from '@/consts/types';

async function getPosts(page: number) {
  try {
    const posts = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?page=${page}`,
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
    console.log('🚀 ~ getPosts ~ error:\n\n\n\n\n', error);
    toast.error(error.message);
    return { posts: [], count: 0 };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const page = parseInt((await searchParams).page) || 1;

  const posts: PostType = await getPosts(page);

  return (
    <Container variant={'fluid'} spacing='none'>
      <Container>
        {page === 1 && (
          <>
            <Featured type='home' />
            <Spacer size={16} sm={12} md={12} />
          </>
        )}

        <div>
          <PopularCategories />
          <Spacer size={16} sm={12} md={12} />

          <Row>
            <Col lg={8} md={3}>
              <RecentPosts
                posts={posts.posts}
                type='home'
                page={page}
                numberOfPosts={posts.count}
              />
              <Spacer size={16} sm={12} md={12} />
              <Pagination page={page} numberOfPosts={posts.count} />
            </Col>

            <Col lg={3} lgOffset={1} md={1}>
              <Spacer sm={12} md={12} />
              <Categories />

              <Spacer size={16} sm={12} md={12} />

              <MostPopularPosts />
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
}
