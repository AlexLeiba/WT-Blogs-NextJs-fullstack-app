import Categories from '@/components/Categories';
import CategoryList from '@/components/PopularCategories';
import EditorPick from '@/components/EditorPick';
import Featured from '@/components/Featured';
import MostPopularPosts from '@/components/MostPopularPosts';
import Pagination from '@/components/Pagination';
import RecentPosts from '@/components/RecentPosts';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import SelectedCategory from '@/components/SelectedCategory';
import { Params } from 'next/dist/server/request/params';
import toast from 'react-hot-toast';
import { PostType } from '@/consts/types';

async function getPosts(category: string, page: number) {
  const posts = await fetch(
    `http://localhost:3000/api/posts?category=${category || ''}&page=${page}`,
    {
      cache: 'no-cache',
    }
  );

  if (!posts.ok) {
    return toast.error(posts.statusText);
  }
  //return data as JSON
  return posts.json();
}

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ category: string; page: string }>;
}) {
  const { category, page } = await searchParams;
  const currentPage = parseInt(page) || 1;

  const posts: PostType = await getPosts(category, currentPage);
  console.log('🚀 ~ posts:', posts, category);
  return (
    <Container
      className='dark:bg-black dark:text-white '
      variant={'fluid'}
      spacing='none'
    >
      <Container>
        <SelectedCategory
          category={{
            title: category,
            img: '',
            slug: category,
          }}
        />
        {/* <Featured type='category' /> */}

        <div>
          {/* <CategoryList /> */}

          <Spacer size={12} />

          <Row>
            <Col lg={8} md={2}>
              <RecentPosts
                posts={posts.posts}
                type='category'
                numberOfPosts={posts.count}
              />

              <Spacer size={12} />

              {posts.posts.length > 0 && (
                <div>
                  <Spacer size={12} />
                  <Pagination
                    page={currentPage}
                    numberOfPosts={posts.count}
                    type='category'
                    category={category}
                  />
                </div>
              )}
            </Col>

            <Col lg={3} lgOffset={1} md={2}>
              <Categories />
              <Spacer size={12} />
              <MostPopularPosts />

              <Spacer size={12} />

              <EditorPick />
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
}
