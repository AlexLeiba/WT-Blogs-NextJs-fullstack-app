import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import React from 'react';

function About() {
  return (
    <Container variant={'fluid'}>
      <Row className='dark:text-white'>
        <Container spacing='none'>
          <h2 className='sm:text-6xl'>About</h2>
          <Spacer size={8} md={4} sm={4} />
          <Row>
            <Col lg={5} md={2} sm={3}>
              <section>
                <h5 className='font-bold'>About Web Tech Blogs</h5>
                <p>
                  This is a blog app focused on web tech topics for sharing the
                  world of web dev the experiences and knowledge useful for the
                  community.
                </p>
              </section>
            </Col>

            <Col lg={5} lgOffset={1} md={2} sm={3}>
              <Spacer sm={4} />

              <section>
                <h5 className='font-bold'>Features</h5>
                <ul>
                  <li>
                    <p>• Authentication with Google/Github</p>
                  </li>
                  <li>
                    <p>• Create / Update / Delete posts</p>
                  </li>
                  <li>
                    <p>• Write comment under post</p>
                  </li>

                  <li>
                    <p>• Private / Public posts</p>
                  </li>
                  <li>
                    <p>
                      • Posts Views / Most Viewed posts / Most viewed by editor
                    </p>
                  </li>
                  <li>
                    <p>• Most popular categories</p>
                  </li>
                  <li>
                    <p>• Sort by category</p>
                  </li>
                  <li>
                    <p>• Pagination</p>
                  </li>
                </ul>
              </section>
            </Col>
            <Col lg={5} md={2} sm={4}>
              <Spacer sm={4} />

              <section>
                <h5 className='font-bold'>Technologies used</h5>

                <div className='flex gap-8'>
                  <div>
                    <p className='text-lg font-bold '>Front-end</p>
                    <ul>
                      <li>
                        <p>Next.js 15</p>
                      </li>
                      <li>
                        <p>React 19</p>
                      </li>
                      <li>
                        <p>Tailwind CSS</p>
                      </li>

                      <li>
                        <p>React-hook-form</p>
                      </li>

                      <li>
                        <p>zod</p>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className=' font-bold text-lg'>Back-end</p>
                    <ul>
                      <li>
                        <p>MongoDB</p>
                      </li>
                      <li>
                        <p>Prisma</p>
                      </li>
                      <li>
                        <p>Next Auth</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default About;
