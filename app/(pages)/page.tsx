import Categories from '@/components/Categories';
import PopularCategories from '@/components/PopularCategories';
import EditorPick from '@/components/EditorPick';
import Featured from '@/components/Featured';
import MostPopularPosts from '@/components/MostPopularPosts';
import Pagination from '@/components/Pagination';
import RecentPosts from '@/components/RecentPosts';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';

export default function Home() {
  return (
    <Container
      className='dark:bg-black dark:text-white '
      variant={'fluid'}
      spacing='none'
    >
      <Container>
        <Featured type='home' />

        <Spacer size={16} />

        <div>
          <PopularCategories />

          <Spacer size={16} />

          <Row>
            <Col lg={8} md={2}>
              <RecentPosts />

              <Spacer size={16} />

              <Pagination />
            </Col>

            <Col lg={3} lgOffset={1} md={2}>
              <Categories />
              <Spacer size={16} />
              <MostPopularPosts />

              <Spacer size={16} />

              <EditorPick />
            </Col>
          </Row>
        </div>
      </Container>
    </Container>
  );
}
