'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Container, Row } from '@/components/UI/Grid';
import { Spacer } from '@/components/UI/spacer/spacer';
import { Button } from '@/components/UI/Button/Button';
import { Input } from '@/components/UI/Input/Input';
import { ImageDown } from 'lucide-react';

import 'react-quill-new/dist/quill.snow.css';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewArticleSchema } from '@/lib/zodSchemas';
import z from 'zod';
import toast from 'react-hot-toast';

import dynamic from 'next/dynamic';

// Dynamically import ReactQuill with SSR disabled
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false, // This disables SSR for ReactQuill
});

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/UI/dropdown/dropdown';
import { CategoryType } from '@/consts/types';
import Image from 'next/image';
import { Loader } from './UI/loader/loader';
import { Checkbox } from './UI/Checkbox/checkbox';
import { useRouter } from 'next/navigation';

function EditArticle() {
  const router = useRouter();
  const uploadFileRef = useRef<HTMLInputElement>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);

  const [loading, setLoading] = useState(false);
  const [uploadImageLoading, setUploadImageLoading] = useState(false);

  useEffect(() => {
    async function getCategories() {
      const categories = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`,
        {
          cache: 'no-cache',
        }
      );

      if (!categories.ok) {
        return toast.error(categories.statusText);
      }
      const categoriesData = await categories.json(); //return data as JSON
      setCategoriesData(categoriesData);
    }

    getCategories();
  }, []);

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
      category: '',
      public: true,
    },
  });

  async function onSubmit(data: FormType) {
    setLoading(true);
    const selectedCategoryDomain = categoriesData.filter(
      (cat) => cat.slug === data.category
    )[0].domain;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/my-articles/new-article`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: data.title,
            desc: data.desc,
            slug: data.title.toLowerCase().replace(/\s+/g, '-'),
            img: previewImageUrl || '',
            catSlug: data.category,
            catDomain: selectedCategoryDomain,
            public: data.public,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      //return data as JSON
      toast.success('New Article was created successfully');
      setLoading(false);

      router.push('/my-articles');
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  // HANDLE FILE UPLOAD
  function handleFileUploadClick() {
    uploadFileRef.current?.click();
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const file = e.target.files?.[0];

    if (file) {
      setUploadImageLoading(true);
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = async () => {
          const base64Image = reader.result as string;

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-image`,
            {
              method: 'POST',
              body: JSON.stringify({ img: base64Image }),
            }
          );

          const responseData = await response.json();

          if (responseData.status === 200) {
            setPreviewImageUrl(responseData.url);
            toast.success('File uploaded successfully');
          }
          setUploadImageLoading(false);
        };
      } catch (error: any) {
        toast.error(error.message);
        setUploadImageLoading(false);
      }
    }
  }

  function handleShowImage() {
    if (previewImageUrl) {
      return true;
    }

    return false;
  }

  return (
    <Container spacing='none'>
      <form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col lg={12}>
            <div className='flex justify-between items-center '>
              <h3 className='dark:text-white'>New Article</h3>
              <div className='flex justify-end flex-col gap-2'>
                <Button
                  variant={'primary'}
                  onClick={handleSubmit(onSubmit)}
                  loading={loading}
                >
                  Save
                </Button>
              </div>
            </div>

            {/* SEPARATOR */}
            <div className='w-full h-[2px] bg-baseline-200' />
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <Spacer size={8} md={4} sm={4} />

            {/* FILE UPLOAD HIDDEN INPUT */}
            <input
              ref={uploadFileRef}
              type='file'
              className='hidden'
              onChange={handleFileChange}
            />

            <Spacer size={8} md={4} sm={4} />

            <Input
              {...register('title')}
              type={'text'}
              placeholder={'Title...'}
              className={' text-4xl dark:bg-black dark:text-white '}
              label={''}
              error={errors?.title?.message}
            />

            <Spacer size={4} />
            <Controller
              name='desc'
              control={control}
              render={({ field: { onChange, value } }) => (
                <ReactQuill
                  className='w-full  text-baseline-950 dark:text-white min-h-[300px] '
                  value={value}
                  onChange={onChange}
                  // onKeyDown={(e) => handleKeyDown(e)}
                  theme='snow'
                  placeholder='Write your article here...'
                />
              )}
            />
            <p className='text-error-500 text-xs'>{errors?.desc?.message}</p>
          </Col>

          <Col lg={3} lgOffset={1}>
            <Spacer size={8} md={4} sm={4} />
            <div>
              <p className='text-xl font-bold dark:text-white'>Category</p>
              <Spacer size={2} />
              <Controller
                name='category'
                control={control}
                render={({ field: { onChange } }) => {
                  return (
                    <Select onValueChange={(e) => onChange(e)}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder={'Select category'} />
                      </SelectTrigger>
                      <SelectContent>
                        {categoriesData.map((category, index) => {
                          return (
                            <SelectItem value={category.slug} key={index}>
                              {category.title}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  );
                }}
              />
              <p className='text-xs text-error-500'>
                {errors?.category?.message}
              </p>
              <Spacer size={8} md={4} sm={4} />

              <Controller
                name='public'
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <Checkbox
                      checked={value}
                      defaultValue={'true'}
                      onCheckedChange={onChange}
                      label={'Public'}
                      className='text-black dark:text-white'
                    />
                  );
                }}
              />

              <Spacer size={8} md={4} sm={4} />
              <p className='text-xl font-bold dark:text-white'>Article cover</p>
              <Spacer size={2} />
              <div className=' h-[150px] w-full relative border-[1px] border-baseline-300 rounded-lg dark:border-white flex items-center justify-center'>
                <Button
                  variant={'ghost'}
                  onClick={handleFileUploadClick}
                  className=' absolute -top-4 -right-8 z-10'
                >
                  <ImageDown
                    width={40}
                    height={40}
                    className='p-2 ring-2 rounded-full dark:text-baseline-200  ring-baseline-400 text-white bg-black'
                  />
                </Button>
                {handleShowImage() ? (
                  <>
                    {uploadImageLoading ? (
                      <Loader size='medium' variant={'primary'} />
                    ) : (
                      <Image
                        fill
                        src={previewImageUrl ? previewImageUrl : ''}
                        alt='article cover'
                        className='w-full h-full object-contain rounded-lg'
                      />
                    )}
                  </>
                ) : (
                  uploadImageLoading && (
                    <Loader size='medium' variant={'primary'} />
                  )
                )}
              </div>
              <Spacer size={8} md={4} sm={4} />
            </div>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

export default EditArticle;
