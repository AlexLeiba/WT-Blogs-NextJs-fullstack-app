import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import React from 'react';

function About() {
  return (
    <Container variant={'fluid'}>
      <Row className='dark:text-white'>
        <Container spacing='none'>
          <h3>About</h3>
          <Spacer size={4} />
          <Row>
            <Col lg={5} md={2} sm={3}>
              <section>
                <h5>About Web Tech Blogs</h5>
                <p>
                  This is a blog app focussed on web tech topics for Sharing the
                  world of web dev the experiences and knowledge useful for the
                  community.
                </p>
              </section>
            </Col>
            <Col lg={5} lgOffset={1} md={2} sm={3}>
              <section>
                <h5>Features</h5>
                <ul>
                  <li>
                    <p>Authentication with Google/Github/Facebook</p>
                  </li>
                  <li>
                    <p>Create / Update / Delete posts</p>
                  </li>

                  <li>
                    <p>Private / Public posts</p>
                  </li>
                  <li>
                    <p>
                      Posts Views / Most Viewed posts / Most viewed by editor
                    </p>
                  </li>
                  <li>
                    <p>Sort by category</p>
                  </li>
                  <li>
                    <p>Pagination</p>
                  </li>
                </ul>
              </section>
            </Col>
            <Col lg={5} md={2} sm={4}>
              <section>
                <h5>Technologies used</h5>
                <Spacer size={2} />
                <div className='flex gap-8'>
                  <div>
                    <p className='text-xl font-bold '>Front-end</p>
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
                    <p className=' font-bold text-xl'>Back-end</p>
                    <ul>
                      <li>
                        <p>MongoDB</p>
                      </li>
                      <li>
                        <p>Prisma</p>
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
