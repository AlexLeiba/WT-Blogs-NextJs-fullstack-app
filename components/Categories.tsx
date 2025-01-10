'use client';
import React, { useEffect, useState } from 'react';
import { localDB } from '@/consts/localDB';
import { Col, Row } from './UI/Grid';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { Spacer } from './UI/spacer/spacer';
import { Button } from './UI/Button/Button';
import toast from 'react-hot-toast';
import { CategoryType } from '@/consts/types';

function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesShown, setCategoriesShown] = useState(6);

  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);

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

  function handleShowHowManyCategoriesLeftWhenIsClosed(index: number) {
    if (categoriesData.length > 6 && !isOpen && index === 5) {
      return true;
    }
  }

  function handleViewMoreOrLess() {
    if (isOpen) {
      setCategoriesShown(6);
      setIsOpen(false);
    } else {
      setCategoriesShown(categoriesData.length);
      setIsOpen(true);
    }
  }
  return (
    <Row className='dark:text-white'>
      <Col>
        <p className='text-baseline-400'>Discover by topic</p>
        <h5 className='text-xl font-bold dark:text-baseline-200 '>
          Categories
        </h5>
        {isOpen ? (
          <Button onClick={handleViewMoreOrLess} variant={'link'}>
            View less
          </Button>
        ) : (
          <Button onClick={handleViewMoreOrLess} variant={'link'}>
            View all
          </Button>
        )}
        <Spacer size={6} />
      </Col>
      {categoriesData.slice(0, categoriesShown).map((category, index) => {
        return (
          <Col key={index} lg={4} md={2} sm={2} className='mb-6 relative'>
            <Link href={`/blog?category=${category.slug}&page=1`}>
              <div
                data-aos='fade-up'
                data-aos-delay={index * 50}
                className={cardVariants({
                  variant: category.slug.toLowerCase().replace('.', ''),
                  size: 'medium',
                })}
              >
                <p className='text-center text-xs text-black dark:text-white'>
                  {category.title}
                </p>
              </div>
            </Link>
            {handleShowHowManyCategoriesLeftWhenIsClosed(index) && (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setCategoriesShown(categoriesData.length);
                  setIsOpen(true);
                }}
                className='cursor-pointer absolute top-0 right-0 left-0  pt-5 pb-5 ml-3 mr-3   h-4 bg-baseline-600 opacity-80 rounded-md flex justify-center items-center'
              >
                <p className='text-white'>
                  +{categoriesData.length - categoriesShown}
                </p>
              </div>
            )}
          </Col>
        );
      })}
    </Row>
  );
}

export default Categories;

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
