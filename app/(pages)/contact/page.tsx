import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function Contact() {
  return (
    <Container variant={'fluid'} className='dark:bg-black  h-[100vh]'>
      <Row className='dark:text-white'>
        <Container spacing='none'>
          <h3 className=' text-center'>Contact</h3>
          <Spacer size={16} />
          <Row>
            <Col
              lg={12}
              className='flex flex-col gap-4 text-center items-center justify-center '
            >
              <div className='flex gap-4 dark:text-white items-center'></div>
              <Link href={'https://github.com/AlexLeiba'}>
                <div className='flex gap-4 dark:text-white items-center'>
                  <h5>Github</h5>
                  <Github width={30} height={30} cursor={'pointer'} />{' '}
                </div>
              </Link>

              <Link href={'mailto:alexleiba@gmail.com'}>
                <div className='flex gap-4 dark:text-white items-center'>
                  <h5>Gmail</h5>
                  <Mail width={30} height={30} cursor={'pointer'} />{' '}
                </div>
              </Link>

              <Link
                href={
                  'https://www.linkedin.com/in/alex-leiba-9205801ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app'
                }
              >
                <div className='flex gap-4 dark:text-white items-center'>
                  <h5>Linkedin</h5>

                  <Linkedin width={30} height={30} cursor={'pointer'} />
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default Contact;
