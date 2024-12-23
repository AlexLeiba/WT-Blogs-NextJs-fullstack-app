'use client';
import React from 'react';
import Categories from '@/components/Categories';
import Comments from '@/components/Comments';
import MostPopularPosts from '@/components/MostPopularPosts';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import Image from 'next/image';
import { Button } from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Input/Input';
import { ImageDown, Info, Plus, Upload, Video } from 'lucide-react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewArticleSchema } from '@/lib/zodSchemas';
import z from 'zod';

function NewArticle() {
  type FormType = z.infer<typeof NewArticleSchema>;
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<FormType>({
    resolver: zodResolver(NewArticleSchema),
    defaultValues: {
      articleValue: '',
      title: '',
    },
  });

  async function onSubmit(data: FormType) {
    console.log(data);
  }
  return (
    <Container variant={'fluid'} className='dark:bg-black '>
      <Row>
        <Container spacing='none'>
          <Row>
            <Col lg={12}>
              <h3 className='dark:text-white'>New Article</h3>
              <Spacer size={2} />

              {/* SEPARATOR */}
              <div className='w-full h-[2px] bg-baseline-200'></div>
              <Spacer size={2} />

              <div className='flex justify-between items-center'>
                <div>
                  <Button variant={'ghost'}>
                    <Plus className=' p-1 ring-2 rounded-full text-baseline-400 ring-baseline-400' />
                  </Button>
                  <Button variant={'ghost'}>
                    <ImageDown className='p-1 ring-2 rounded-full text-baseline-400 ring-baseline-400' />
                  </Button>
                  <Button variant={'ghost'}>
                    <Upload className='p-1 ring-2 rounded-full text-baseline-400 ring-baseline-400' />
                  </Button>
                  <Button variant={'ghost'}>
                    <Video className='p-1 ring-2 rounded-full text-baseline-400 ring-baseline-400' />
                  </Button>
                </div>
                <div className='flex items-center gap-2 dark:text-baseline-400'>
                  <Info className='dark:text-white' />
                  <p>
                    To change the style of the article text, highlight the text.
                  </p>
                </div>
              </div>
              <Spacer size={8} />
              <Input
                {...register('title')}
                type={'text'}
                placeholder={'Title...'}
                className={' text-4xl dark:bg-black dark:text-white '}
                label={''}
                error={undefined}
              />
              <Spacer size={4} />

              <Controller
                name='articleValue'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ReactQuill
                    defaultValue={'Write your article here...'}
                    className='w-full h-full text-[100px] text-baseline-950 dark:text-white'
                    value={value}
                    onChange={onChange}
                    theme='bubble'
                    placeholder='Write your article here...'
                  />
                )}
              />
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default NewArticle;
