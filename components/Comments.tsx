'use client';
import React from 'react';
import { Col, Row } from './UI/Grid';
import { Input } from './UI/Input/Input';
import { Button } from './UI/Button/Button';
import { Spacer } from './UI/spacer/spacer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendComment } from '@/lib/zodSchemas';
import z from 'zod';
import { commentsMockedData, localDB } from '@/consts/localDB';
import Image from 'next/image';

function Comments() {
  type FormType = z.infer<typeof SendComment>;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(SendComment),
    defaultValues: {
      comment: '',
    },
  });

  async function onSubmit(data: FormType) {
    console.log(data);
  }

  return (
    <Row>
      <Col>
        <p className='text-xl font-bold'>Comments</p>
        <Spacer size={2} />
        <Input
          {...register('comment')}
          type={'textarea'}
          placeholder={'write a comment...'}
          className={'h-16 pt-2 pb-2 pl-4 pr-4 rounded-md bg-baseline-100'}
          label={''}
          error={undefined}
        />
        <Spacer size={2} />
        <Button onClick={handleSubmit(onSubmit)} className='w-full'>
          Send
        </Button>
        <Spacer size={16} />

        {commentsMockedData.map((comment, index) => {
          return (
            <div className='flex  mb-16 flex-col ' key={index}>
              <div className='flex items-center gap-4'>
                <Image
                  src='/colorful.jpeg'
                  alt='blog image'
                  width={50}
                  height={50}
                  className='w-10 h-10 object-cover rounded-full'
                />
                <div className='text-baseline-400'>
                  <p className='font-semibold '>Alex leiba</p>
                  <p className='text-s '>25 apr 2023</p>
                </div>
              </div>

              <Spacer size={8} />
              <p className=''>{comment.comment}</p>
            </div>
          );
        })}
      </Col>
    </Row>
  );
}

export default Comments;
