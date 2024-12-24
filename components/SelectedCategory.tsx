import React from 'react';
import { Col, Row } from './UI/Grid';
import { cardVariants } from '@/utils/categoriesColorVariants';
import Image from 'next/image';

function SelectedCategory({
  category,
}: {
  category: { title: string; img: string; slug: string };
}) {
  return (
    <Row>
      <Col>
        <p className='text-xl dark:text-white '>Selected category</p>
      </Col>

      <Col lg={12} md={2} className='md:mb-6 sm:mb-6'>
        <div
          className={cardVariants({ variant: category.slug, size: 'large' })}
        >
          <p className='text-xl font-bold text-black dark:text-white'>
            {category.title}
          </p>
          {category.img && (
            <Image
              src={category.img}
              alt={category.title}
              width={100}
              height={100}
              className='  w-8 h-8'
            />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default SelectedCategory;
