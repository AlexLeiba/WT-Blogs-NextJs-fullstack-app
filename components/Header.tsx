import { Code2, Github, Linkedin, Mail } from 'lucide-react';

import React from 'react';
import AuthLinks from './AuthLinks';
import ThemeToggle from './ThemeToggle';
import { Col, Container, Row } from './UI/Grid';

function header() {
  return (
    <div className='  p-4 bg-baseline-100 dark:bg-baseline-900 fixed top-0 left-0 right-0 '>
      <Container
        spacing='none'
        variant={'fluid'}
        className='bg-baseline-100 position-fixed top-0 left-0 right-0 z-50'
      >
        <Row>
          <Container spacing='none'>
            <Row>
              <Col className='relative flex justify-between items-center '>
                {/* Social Icons */}
                <div className='flex gap-4 dark:text-white'>
                  <Github width={20} height={20} cursor={'pointer'} />{' '}
                  <Mail width={20} height={20} cursor={'pointer'} />{' '}
                  <Linkedin width={20} height={20} cursor={'pointer'} />
                </div>

                {/* Logo */}
                <div className='flex font-bold dark:text-white'>
                  <Code2 />
                  Tech-Blogs
                </div>

                {/* Links */}
                <div className='flex gap-4'>
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
