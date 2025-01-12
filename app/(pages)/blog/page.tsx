import Categories from '@/components/Categories';
import MostPopularPosts from '@/components/MostPopularPosts';
import Pagination from '@/components/Pagination';
import RecentPosts from '@/components/Posts/RecentPosts';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import SelectedCategory from '@/components/SelectedCategory';
import toast from 'react-hot-toast';
import { PostType } from '@/consts/types';

async function getPosts(category: string, page: number) {
  if (category) {
    try {
      const posts = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?category=${
          category || ''
        }&page=${page}`,
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
}

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string; page: string }>;
}) {
  const { category, page } = await searchParams;
  const currentPage = parseInt(page) || 1;

  const posts: PostType = await getPosts(category, currentPage);

  return (
    <Container variant={'fluid'} spacing='none'>
      <Container>
        <SelectedCategory categorySlug={category} />

        <div>
          <Spacer size={12} sm={6} md={6} />

          <Row>
            <Col lg={8} md={3}>
              <RecentPosts
                posts={posts?.posts}
                type='category'
                numberOfPosts={posts?.count}
                page={currentPage}
              />

              {posts?.posts.length > 0 && (
                <div>
                  <Spacer size={12} sm={6} md={6} />
                  <Pagination
                    page={currentPage}
                    numberOfPosts={posts?.count}
                    type='category'
                    category={category}
                  />
                </div>
              )}
            </Col>

            <Col lg={3} lgOffset={1} md={1}>
              <Spacer sm={12} md={12} />
              <Categories />
              <Spacer size={12} />
              <MostPopularPosts />
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
}
