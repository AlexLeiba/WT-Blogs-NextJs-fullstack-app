'use client';
import React from 'react';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import Image from 'next/image';
import { Button } from '@/components/UI/Button/Button';
import { signIn } from 'next-auth/react';

function Signin() {
  return (
    <Container variant={'fluid'} className='min-h-[calc(100vh-278px)]'>
      <Row>
        <Container spacing='none'>
          <Row>
            <Col lg={12}>
              <div className='flex  justify-center items-center h-[calc(100vh-278px)]'>
                <div className='shadow-lg text-center w-[700px] dark:text-white dark:bg-baseline-900 bg-baseline-100 p-4  rounded-lg  flex justify-center items-center flex-col gap-4'>
                  <div>
                    <h4 className='text-xl font-bold'>Sign in</h4>
                    <p className=' dark:text-baseline-200 text-black'>
                      Sign in to your account by using your social media account
                    </p>
                  </div>

                  <Spacer size={6} />

                  <div className='flex flex-col gap-2 p-2'>
                    <Button
                      leftIcon={
                        <div>
                          <Image
                            src='/social-icons/company=google.svg'
                            alt='google'
                            width={20}
                            height={20}
                          />
                        </div>
                      }
                      variant={'tonal'}
                      onClick={() => signIn('google', { redirectTo: '/' })}
                    >
                      Sign in with Google
                    </Button>
                    <Spacer size={6} />
                    <Button
                      leftIcon={
                        <div>
                          <Image
                            src='/social-icons/company=github.svg'
                            alt='github'
                            width={20}
                            height={20}
                          />
                        </div>
                      }
                      onClick={() => signIn('github', { redirectTo: '/' })}
                      variant={'baseline'}
                    >
                      Sign in with Github
                    </Button>

                    <Spacer size={6} />
                    {/* <Spacer size={6} />
                    <Button
                      leftIcon={
                        <Image
                          src='/social-icons/company=facebook.svg'
                          alt='facebook'
                          width={20}
                          height={20}
                        />
                      }
                      onClick={() => signIn('facebook')}
                      className=' bg-primary-500 hover:bg-primary-400'
                      variant={'primary'}
                    >
                      Sign in with Facebook
                    </Button> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default Signin;
