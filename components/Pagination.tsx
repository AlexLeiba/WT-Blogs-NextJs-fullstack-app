import React from 'react';
import { Col, Row } from './UI/Grid';
import { Button } from './UI/Button/Button';

function Pagination() {
  return (
    <Row>
      <Col className='flex justify-between'>
        <Button
          variant={'baseline'}
          size={'medium'}
          className={'dark:text-white'}
        >
          Previous
        </Button>

        <Button
          variant={'baseline'}
          size={'medium'}
          className={'dark:text-white'}
        >
          Next
        </Button>
      </Col>
    </Row>
  );
}

export default Pagination;
