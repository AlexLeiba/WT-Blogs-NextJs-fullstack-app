'use client';
import Categories from '@/components/Categories';
import MostPopularPosts from '@/components/MostPopularPosts';
import Pagination from '@/components/Pagination';
import RecentPosts from '@/components/RecentPosts';
import { Col, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import toast from 'react-hot-toast';
import { PostType } from '@/consts/types';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from './UI/Button/Button';
import Link from 'next/link';
import { Loader } from './UI/loader/loader';

export function MyArticles({ currentPage }: { currentPage: number }) {
  const [postsData, setPostsData] = useState<PostType>({
    posts: [],
    count: 0,
  });
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  async function getPostsData() {
    try {
      if (userEmail) {
        const posts = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-articles?page=${currentPage}`,
          {
            cache: 'no-cache',
          }
        );

        if (!posts.ok) {
          throw new Error('This blog was not found');
        }
        //return data as JSON
        const postsData = await posts.json();

        setPostsData(postsData);
        setLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  }
  useEffect(() => {
    setLoading(true);

    getPostsData();
  }, [currentPage, session, userEmail]);

  return (
    <Row>
      <Col lg={8} md={3}>
        <div className='flex justify-between items-center ' data-aos='fade-up'>
          <h2 className='text-6xl'>My articles</h2>

          <Link href='/my-articles/new-article'>
            <Button variant={'primary'}>Add new</Button>
          </Link>
        </div>
        <Spacer size={8} sm={4} md={4} />
        {loading ? (
          <div className='flex justify-center items-center'>
            <Spacer size={8} sm={4} md={4} />
            <Loader size='medium' variant={'primary'} />
          </div>
        ) : (
          <RecentPosts
            page={currentPage}
            refetchPosts={getPostsData}
            posts={postsData.posts}
            type='my-articles'
            numberOfPosts={postsData.count}
          />
        )}

        {postsData?.posts?.length > 0 && (
          <div>
            <Spacer size={16} md={12} sm={12} />
            <Pagination
              page={currentPage}
              numberOfPosts={postsData.count}
              type='my-articles'
            />
          </div>
        )}
      </Col>

      <Col lg={3} lgOffset={1} md={1}>
        <Spacer md={12} sm={12} />
        <Categories />
        <Spacer size={16} md={12} sm={12} />
        <MostPopularPosts />
      </Col>
    </Row>
  );
}
