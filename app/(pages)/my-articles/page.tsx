import { Container } from '@/components/UI/Grid';
import { MyArticles } from '@/components/MyArticles';

export default async function MyArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = parseInt(page) || 1;

  return (
    <Container variant={'fluid'} spacing='none'>
      <Container>
        <MyArticles currentPage={currentPage} />
      </Container>
    </Container>
  );
}
