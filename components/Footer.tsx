import React from 'react';
import { Col, Container, Row } from './UI/Grid';
import { Code2 } from 'lucide-react';
import Link from 'next/link';

function footer() {
  return (
    <Container
      variant={'fluid'}
      spacing='none'
      className=' p-4 bg-baseline-100 dark:bg-baseline-900 '
    >
      <Container>
        <Row className='dark:text-white'>
          <Col lg={5} md={2}>
            {/* Logo */}
            <div className='flex font-bold '>
              <Code2 />
              Tech-Blogs
            </div>
          </Col>
          <Col lg={2} lgOffset={1} md={2}>
            <p className='text-xl font-bold'>Links</p>
            <div className='dark:text-baseline-200'>
              <Link href='/'>
                <p>Homepage</p>
              </Link>
              <Link href='/'>
                <p>Blog</p>
              </Link>
              <Link href='/'>
                <p>About</p>
              </Link>
              <Link href='/'>
                <p>Contact</p>
              </Link>
            </div>
          </Col>
          <Col lg={2} md={2}>
            <p className='text-xl font-bold'>Tags</p>
            <div className='dark:text-baseline-200'>
              <Link href='/'>
                <p>React</p>
              </Link>
              <Link href='/'>
                <p>Next.js</p>
              </Link>
              <Link href='/'>
                <p>TypeScript</p>
              </Link>
              <Link href='/'>
                <p>Tailwind</p>
              </Link>
            </div>
          </Col>
          <Col lg={2} md={2}>
            <p className='text-xl font-bold'>Social</p>
            <div className='dark:text-baseline-200'>
              <p>Github</p>
              <p>Linkedin</p>
              <p>Gmail</p>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default footer;
