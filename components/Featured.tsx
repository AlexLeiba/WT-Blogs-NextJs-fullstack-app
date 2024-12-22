import React from 'react';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import { Button } from './UI/Button/Button';
import { Col, Row } from './UI/Grid';

function Featured({ type }: { type: 'category' | 'home' }) {
  return (
    <div>
      {type === 'home' && (
        <h2>
          <strong>Discover web development journey</strong> in these amazing dev
          blogs
        </h2>
      )}

      <Spacer size={12} />

      <Row className=' items-center'>
        <Col lg={6} md={2}>
          <Image
            className='w-full'
            src={'/colorful.jpeg'}
            alt='colorful'
            width={400}
            height={400}
          />
        </Col>
        <Col lg={6} md={2}>
          <div>
            <h5 className='font-bold'>Featured Blogs</h5>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              dolorum laudantium
            </p>

            <Spacer size={8} />
            <Button
              variant={'primary'}
              size={'medium'}
              className={'dark:text-white'}
            >
              Read More
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Featured;
