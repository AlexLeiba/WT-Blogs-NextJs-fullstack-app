import React from 'react';
import { Container, Row } from '@/components/UI/Grid';
import CreateNewArticle from '@/components/CreateNewArticle';

function NewArticle() {
  return (
    <Container variant={'fluid'}>
      <Row>
        <CreateNewArticle />
      </Row>
    </Container>
  );
}

export default NewArticle;
