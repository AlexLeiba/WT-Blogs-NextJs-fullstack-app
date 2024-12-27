import React from 'react';
import { Container, Row } from '@/components/UI/Grid';
import CreateNewArticle from '@/components/CreateNewArticle';
import EditArticle from '@/components/EditArticle';

async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}) {
  const { articleSlug } = await params;
  console.log('🚀 ~ articleSlug:', articleSlug);

  return (
    <Container variant={'fluid'} className='dark:bg-black h-[100vh] '>
      <Row>
        <EditArticle articleSlug={articleSlug} />
      </Row>
    </Container>
  );
}

export default EditArticlePage;
