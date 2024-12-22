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

export default async function CategoryPage({
  params,
}: {
  params: Promise<Params>;
}) {
  console.log('🚀 ~ CategoryPage ~ params:', await params);
  return (
    <Container
      className='dark:bg-black dark:text-white '
      variant={'fluid'}
      spacing='none'
    >
      <Container>
        <SelectedCategory />
        <Featured type='category' />

        <Spacer size={12} />

        <div>
          <CategoryList />

          <Spacer size={12} />

          <Row>
            <Col lg={8} md={2}>
              <RecentPosts />

              <Spacer size={12} />

              <Pagination />
            </Col>

            <Col lg={3} lgOffset={1} md={2}>
              <MostPopularPosts />

              <Spacer size={12} />

              <Categories />

              <Spacer size={12} />

              <EditorPick />
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
}
