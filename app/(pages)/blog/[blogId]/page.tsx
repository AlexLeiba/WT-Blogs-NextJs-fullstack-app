import React from 'react';
import Categories from '@/components/Categories';
import Comments from '@/components/Comments';
import MostPopularPosts from '@/components/MostPopularPosts';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import Image from 'next/image';

function SingleBlog() {
  return (
    <Container variant={'fluid'} className='dark:bg-black '>
      <Row>
        <Container spacing='none'>
          <Row>
            <Col
              lg={6}
              className='flex flex-col justify-between dark:text-white'
            >
              <h2 className='font-bold line-clamp-3'>
                The selected blog tids dsds dsds dsdssd dsdstle
              </h2>

              <div className='flex items-center gap-4'>
                <Image
                  src='/colorful.jpeg'
                  alt='blog image'
                  width={50}
                  height={50}
                  className='w-10 h-10 object-cover rounded-full'
                />
                <div className='text-baseline-400'>
                  <p className='font-semibold '>Alex leiba</p>
                  <p className='text-s '>25 apr 2023</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <Image
                src='/colorful.jpeg'
                alt='blog image'
                width={400}
                height={400}
                className='w-full h-full object-cover rounded-lg'
              />
            </Col>
          </Row>

          <Row>
            <Col lg={7} className=' dark:text-baseline-200 text:baseline-950'>
              <Spacer size={16} />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                sunt quia quisquam praesentium magnam adipisci, tempora corporis
                commodi pariatur id eum repellat voluptatem doloribus
                perspiciatis dolore reprehenderit suscipit sed. Illum sit ab
                sapiente accusamus nihil deleniti nostrum ad, nesciunt aliquam
                labore? Neque consequuntur ut accusamus quae ab incidunt
                praesentium qui blanditiis quod impedit modi minus ullam
                expedita quos voluptate iste ex exercitationem, alias, deserunt
                consequatur explicabo optio? Modi veritatis iste dolorum est
                debitis quas. Explicabo labore doloribus eaque alias eligendi
                saepe commodi mollitia ullam voluptatibus. Autem quidem
                excepturi laboriosam. Voluptate voluptates, maxime cupiditate
                non corrupti numquam error facere quae! Ullam?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                dolor modi eius? Vel libero a voluptates fugit maxime molestias
                autem?
              </p>

              <Spacer size={16} />

              <Comments />
            </Col>
            <Col
              lg={4}
              lgOffset={1}
              className='dark:text-baseline-200 text:baseline-950'
            >
              <Spacer size={16} />

              <MostPopularPosts />

              <Spacer size={16} />

              <Categories />
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default SingleBlog;
