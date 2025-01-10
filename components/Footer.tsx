import React from 'react';
import { Col, Container, Row } from './UI/Grid';
import { Code2 } from 'lucide-react';
import Link from 'next/link';
import { Spacer } from './UI/spacer/spacer';

function Footer() {
  return (
    <Container
      variant={'fluid'}
      spacing='none'
      className='  bg-baseline-100 dark:bg-baseline-900   '
    >
      <Container
        spacing='medium'
        className='md:text-left lg:text-left text-center'
      >
        <Row className='dark:text-white'>
          <Col
            lg={5}
            md={2}
            className='flex lg:justify-start md:justify-start justify-center'
          >
            {/* Logo */}
            <Link href='/'>
              <div className='flex font-bold '>
                <Code2 />
                WT-BLOGS
              </div>
            </Link>
            <Spacer size={2} />
            <div className='flex gap-4'>
              <p>{new Date().getFullYear()}</p>•<p>Alexandru Leiba</p>
            </div>
          </Col>
          <Col lg={2} lgOffset={1} md={2}>
            <Spacer sm={4} />
            <p className='text-xl font-bold'>Links</p>
            <div className='dark:text-baseline-200'>
              <Link href='/'>
                <p>Blogs</p>
              </Link>
              <Link href='/about'>
                <p>About</p>
              </Link>

              <Link href='/contact'>
                <p>Contact</p>
              </Link>
            </div>
          </Col>
          <Col lg={2} md={2}>
            <Spacer sm={4} md={4} />
            <p className='text-xl font-bold'>Categories</p>
            <div className='dark:text-baseline-200'>
              <Link href='/blog?category=react&page=1'>
                <p>React</p>
              </Link>
              <Link href='/blog?category=nextjs&page=1'>
                <p>Next.js</p>
              </Link>
              <Link href='/blog?category=typescript&page=1'>
                <p>TypeScript</p>
              </Link>
              <Link href='/blog?category=tailwind&page=1'>
                <p>Tailwind</p>
              </Link>
            </div>
          </Col>
          <Col lg={2} md={2}>
            <Spacer sm={4} md={4} />
            <p className='text-xl font-bold'>Social</p>
            <div className='dark:text-baseline-200'>
              <Link href={'href="https://github.com/AlexLeiba"'}>
                <p>Github</p>
              </Link>

              <Link
                href={
                  'https://www.linkedin.com/in/alex-leiba-9205801ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
                }
              >
                <p>Linkedin</p>
              </Link>

              <Link href={'mailto:alexleiba@gmail.com'}>
                <p>Gmail</p>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Footer;
