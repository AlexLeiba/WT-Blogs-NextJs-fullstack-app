'use client';
import React, { useEffect, useState } from 'react';
import { Col, Row } from './UI/Grid';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Button } from './UI/Button/Button';
import { CategoryType } from '@/consts/types';
import { useRouter } from 'next/navigation';
import { Loader } from './UI/loader/loader';

function PopularCategories() {
  const [loading, setLoading] = useState(true);
  async function getCategories(category?: string) {
    try {
      const categories = await fetch(
        `${
          process.env.NEXT_PUBLIC_BASE_URL
        }/api/categories/most-popular-categories?category=${
          category ? category : 'frontend'
        }`,
        {
          cache: 'no-cache',
        }
      );

      if (!categories.ok) {
        throw new Error(categories.statusText);
      }
      const categoriesData = await categories.json(); //return data as JSON
      setCategoriesData(categoriesData);
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  const [categoryType, setCategoryType] = useState({
    name: 'frontend',
  });
  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Row>
      <Col>
        <div className='flex justify-between gap-4 items-center '>
          <h5 className='text-xl font-bold'>Popular Categories</h5>
          <div className='flex gap-2'>
            <Button
              onClick={() => {
                setCategoryType({ name: 'frontend' });
                getCategories('frontend');
              }}
              variant={'link'}
              className={cn(
                categoryType.name === 'frontend'
                  ? 'underline text-black dark:text-white'
                  : ''
              )}
            >
              Front-end
            </Button>

            <Button
              className={cn(
                categoryType.name === 'backend'
                  ? 'underline text-black dark:text-white'
                  : ''
              )}
              onClick={() => {
                setCategoryType({ name: 'backend' });
                getCategories('backend');
              }}
              variant={'link'}
            >
              Back-end
            </Button>
          </div>
        </div>
        <Spacer size={6} />
      </Col>
      {loading && (
        <div className='flex justify-center w-full'>
          <Loader variant={'primary'} size={'medium'} />{' '}
        </div>
      )}

      {!loading &&
        categoriesData?.map((category, index) => {
          return (
            <Col key={index} lg={2} md={2} className='md:mb-6 sm:mb-6'>
              <Link href={`/blog?category=${category.slug}&page=1`}>
                <div
                  // data-aos='fade-up'
                  // data-aos-delay={index * 50}
                  className={cn(
                    'p-6',
                    cardVariants({
                      variant: category.slug.toLowerCase().replace('.', ''),
                      size: 'large',
                    })
                  )}
                >
                  {category.img && (
                    <Image
                      src={category.img}
                      alt={category.title}
                      width={100}
                      height={100}
                      className='  w-8 h-8'
                    />
                  )}
                  <p className='text-black dark:text-white'>{category.title}</p>

                  <p>{category?.Posts?.length}</p>
                </div>
              </Link>
            </Col>
          );
        })}
    </Row>
  );
}

export default PopularCategories;

export const cardVariants: any = cva(
  [
    'flex w-full items-center justify-center rounded-md gap-2',
    // accessibility
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        frontend: [
          'bg-success-100  hover:bg-success-300',
          'dark:bg-success-900 dark:hover:bg-success-700',
        ],
        reactjs: [
          'bg-primary-100  hover:bg-primary-300',
          'dark:bg-primary-900 dark:hover:bg-primary-700',
        ],
        nextjs: [
          'bg-baseline-100 hover:bg-baseline-300',
          'dark:bg-baseline-900',
        ],
        javascript: [
          'bg-secondary-100  hover:bg-secondary-300',
          'dark:bg-secondary-900 dark:hover:bg-secondary-700',
        ],
        tailwind: [
          'bg-tertiary-100  hover:bg-tertiary-300',
          ' dark:bg-tertiary-900 dark:hover:bg-tertiary-700',
        ],
        css: [
          'bg-error-100  hover:bg-error-300',
          'dark:bg-error-900 dark:hover:bg-error-700',
        ],
        typescript: [
          'bg-success-100  hover:bg-success-300',
          'dark:bg-success-900 dark:hover:bg-success-700',
        ],
        html: [
          'bg-primary-100  hover:bg-primary-300',
          'dark:bg-primary-900 dark:hover:bg-primary-700',
        ],

        // BACKEND
        backend: [
          'bg-baseline-100 hover:bg-baseline-300',
          'dark:bg-baseline-900',
        ],
        nodejs: [
          'bg-primary-100  hover:bg-primary-300',
          ' dark:bg-primary-900 dark:hover:bg-primary-700',
        ],
        expressjs: [
          'bg-baseline-100 hover:bg-baseline-300',
          'dark:bg-baseline-900',
        ],
        graphql: [
          'bg-secondary-100  hover:bg-secondary-300',
          'dark:bg-secondary-900 dark:hover:bg-secondary-700',
        ],
        prisma: [
          'bg-tertiary-100  hover:bg-tertiary-300',
          'dark:bg-tertiary-900 dark:hover:bg-tertiary-700',
        ],
        mongodb: [
          'bg-error-100  hover:bg-error-300',
          'dark:bg-error-900 dark:hover:bg-error-700',
        ],
        nextauth: [
          'bg-success-100  hover:bg-success-300',
          'dark:bg-success-900 dark:hover:bg-success-700',
        ],
        database: [
          'bg-primary-100  hover:bg-primary-300',
          ' dark:bg-primary-900 dark:hover:bg-primary-700',
        ],
        sql: [
          'bg-secondary-100  hover:bg-secondary-300',
          'dark:bg-secondary-900 dark:hover:bg-secondary-700',
        ],

        auth: ['bg-baseline-100 hover:bg-baseline-300', 'dark:bg-baseline-900'],
      },
      size: {
        large: 'h-2 p-6 relative ',
        medium: 'h-4 p-5 relative ',
      },
    },
  }
);
