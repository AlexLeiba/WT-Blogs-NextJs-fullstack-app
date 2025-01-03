import { Code2, Github, Linkedin, Mail } from 'lucide-react';

import React from 'react';
import AuthLinks from './AuthLinks';
import ThemeToggle from './ThemeToggle';
import { Col, Container, Row } from './UI/Grid';
import Link from 'next/link';

function header() {
  return (
    <div className='z-50  p-4 bg-baseline-100 dark:bg-baseline-900 fixed top-0 left-0 right-0 '>
      <Container
        spacing='none'
        variant={'fluid'}
        className=' position-fixed top-0 left-0 right-0 z-50'
      >
        <Row>
          <Container spacing='none'>
            <Row>
              <Col className='relative flex justify-between items-center '>
                {/* Social Icons */}
                <div className='flex gap-4 dark:text-white'>
                  {/* Logo */}
                  <Link href={'/'}>
                    <div className='flex font-bold dark:text-white'>
                      <Code2 />
                      WT-BLOGS
                    </div>
                  </Link>
                  <Link href={'href="https://github.com/AlexLeiba"'}>
                    <Github width={20} height={20} cursor={'pointer'} />{' '}
                  </Link>
                  <Link href={'mailto:alexleiba@gmail.com'}>
                    <Mail width={20} height={20} cursor={'pointer'} />{' '}
                  </Link>
                  <Link
                    href={
                      'https://www.linkedin.com/in/alex-leiba-9205801ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
                    }
                  >
                    <Linkedin width={20} height={20} cursor={'pointer'} />
                  </Link>
                </div>

                {/* Links */}
                <div className='flex gap-4 items-center'>
                  <ThemeToggle />
                  <AuthLinks />
                </div>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
}

export default header;
