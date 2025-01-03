import React from 'react';
import { Container, Row } from '@/components/UI/Grid';
import EditArticle from '@/components/EditArticle';

async function EditArticlePage({
  params,
}: {
  params: Promise<{ articleSlug: string }>;
}) {
  const { articleSlug } = await params;

  return (
    <Container variant={'fluid'}>
      <Row>
        <EditArticle articleSlug={articleSlug} />
      </Row>
    </Container>
  );
}

export default EditArticlePage;
