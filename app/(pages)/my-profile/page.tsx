import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import React from 'react';
import { auth } from '@/auth';
import Image from 'next/image';

async function MyProfile() {
  const data = await auth();
  const userData = data?.user;

  return (
    <Container variant={'fluid'}>
      <Row className='dark:text-white'>
        <Container spacing='none'>
          <h3 className=' text-center'>My Profile</h3>
          <Spacer size={16} />
          <Row>
            <Col
              lg={12}
              className='flex flex-col gap-8 items-center justify-center '
            >
              <Image
                width={100}
                height={100}
                src={userData?.image || '/colorful.jpeg'}
                alt={'user avatar'}
                className='w-32  h-32 rounded-full object-cover ring-4 dark:ring-white ring-baseline-900'
              />

              <div>
                <div className='flex justify-between items-center gap-4'>
                  <p className='font-bold text-xl'>Email:</p>
                  <p> {userData?.email}</p>
                </div>

                <div className='flex justify-between items-center'>
                  <p className='font-bold text-xl'>Name:</p>
                  <p> {userData?.name}</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default MyProfile;
