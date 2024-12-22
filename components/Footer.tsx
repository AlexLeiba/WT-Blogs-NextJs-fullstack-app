import React from 'react';
import { Col, Container, Row } from './UI/Grid';
import { Code2 } from 'lucide-react';

function footer() {
  return (
    <Container
      variant={'fluid'}
      spacing='none'
      className=' p-4 bg-baseline-100 '
    >
      <Container>
        <Row>
          <Col lg={5} md={2}>
            {/* Logo */}
            <div className='flex font-bold dark:text-white'>
              <Code2 />
              Tech-Blogs
            </div>
          </Col>
          <Col lg={2} lgOffset={1} md={2}>
            <p className='text-xl font-bold'>Links</p>
            <p>Homepage</p>
            <p>Blog</p>
            <p>About</p>
            <p>Contact</p>
          </Col>
          <Col lg={2} md={2}>
            <p className='text-xl font-bold'>Tags</p>
            <p>React</p>
            <p>Next.js</p>
            <p>TypeScript</p>
            <p>Tailwind</p>
          </Col>
          <Col lg={2} md={2}>
            <p className='text-xl font-bold'>Social</p>

            <p>Github</p>
            <p>Linkedin</p>
            <p>Gmail</p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default footer;
