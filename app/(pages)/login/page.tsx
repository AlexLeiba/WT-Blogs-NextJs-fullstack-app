'use client';
import React from 'react';
import Categories from '@/components/Categories';
import Comments from '@/components/Comments';
import MostPopularPosts from '@/components/MostPopularPosts';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import Image from 'next/image';
import { Button } from '@/components/UI/Button/Button';
import { useSession, signIn } from 'next-auth/react';

function Login() {
  const { data, status } = useSession();
  console.log(data, status);
  return (
    <Container variant={'fluid'} className='dark:bg-black '>
      <Row>
        <Container spacing='none'>
          <Row>
            <Col lg={12} className='flex  justify-center items-center'>
              <div className='    shadow-lg text-center w-[700px] dark:text-white dark:bg-baseline-900 bg-baseline-100 p-4  rounded-lg  flex justify-center items-center flex-col gap-4'>
                <h3 className='text-xl font-bold'>Login</h3>
                <p className=' text-baseline-200'>
                  Sign in to your account by using your social media account
                </p>

                <div className='flex flex-col gap-2 p-16'>
                  <Button
                    variant={'destructive'}
                    onClick={() => signIn('google')}
                  >
                    Sign in with Google
                  </Button>
                  <Spacer size={6} />
                  <Button onClick={() => signIn('github')} variant={'baseline'}>
                    Sign in with Github
                  </Button>
                  <Spacer size={6} />
                  <Button
                    onClick={() => signIn('facebook')}
                    className=' bg-primary-500'
                    variant={'primary'}
                  >
                    Sign in with Facebook
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default Login;
