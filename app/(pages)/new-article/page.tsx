'use client';
import React from 'react';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import { Button } from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Input/Input';
import { ImageDown, Info, Plus, Upload, Video } from 'lucide-react';

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.bubble.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewArticleSchema } from '@/lib/zodSchemas';
import z from 'zod';
import toast from 'react-hot-toast';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/select';

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
      desc: '',
      title: '',
    },
  });

  async function onSubmit(data: FormType) {
    console.log(data);

    try {
      const response = await fetch(
        `http://localhost:3000/api/create-new-post`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: data.title,
            desc: data.desc,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('This blog was not found');
      }

      //return data as JSON
      toast.success('Article created successfully');
    } catch (error: any) {
      console.log('🚀 ~ \n\n\n\n\n post:', error);
      toast.error(error.message);
    }
  }

  return (
    <Container variant={'fluid'} className='dark:bg-black h-[100vh] '>
      <Row>
        <Container spacing='none'>
          <Row>
            <Col lg={12}>
              <div className='flex justify-between items-center '>
                <h3 className='dark:text-white'>New Article</h3>
                <div className='flex justify-end flex-col gap-2'>
                  <Button variant={'primary'} onClick={handleSubmit(onSubmit)}>
                    Save
                  </Button>
                </div>
              </div>

              {/* SEPARATOR */}
              <div className='w-full h-[2px] bg-baseline-200' />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
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

              <div className='flex items-center gap-2 w-full justify-between'>
                <Input
                  {...register('title')}
                  type={'text'}
                  placeholder={'Title...'}
                  className={' text-4xl dark:bg-black dark:text-white '}
                  label={''}
                  error={errors?.title?.message}
                />

                <div>
                  <p className='text-xl font-bold'>Category</p>
                  <Spacer size={2} />
                  <Select>
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Theme' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='light'>Light</SelectItem>
                      <SelectItem value='dark'>Dark</SelectItem>
                      <SelectItem value='system'>System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Spacer size={4} />

              <Controller
                name='desc'
                control={control}
                render={({ field: { onChange, value } }) => (
                  <ReactQuill
                    defaultValue={'Write your article here...'}
                    className='w-full  text-[100px] text-baseline-950 dark:text-white'
                    value={value}
                    onChange={onChange}
                    theme='bubble'
                    placeholder='Write your article here...'
                  />
                )}
              />
              <p className='text-error-500 text-xs'>{errors?.desc?.message}</p>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
}

export default NewArticle;
