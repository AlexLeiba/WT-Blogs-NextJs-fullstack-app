'use client';
import React, { useEffect, useState } from 'react';
import { localDB } from '@/consts/localDB';
import { Col, Row } from './UI/Grid';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { Spacer } from './UI/spacer/spacer';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { Button } from './UI/Button/Button';
import { CategoryType } from '@/consts/types';
import { cardVariants } from '@/utils/categoriesColorVariants';

function PopularCategories() {
  const [categoryType, setCategoryType] = useState({
    name: 'frontend',
    slice1: 0,
    slice2: 6,
  });
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

  function handleCreate() {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/create-post`, {
      method: 'POST',
    });
  }

  return (
    <Row>
      <Col>
        <div className='flex justify-between gap-4 items-center '>
          <h5 className='text-xl font-bold'>Popular Categories</h5>
          <div className='flex gap-2'>
            <Button
              onClick={() =>
                setCategoryType({ name: 'frontend', slice1: 0, slice2: 6 })
              }
              variant={'link'}
              className={cn(
                categoryType.name === 'frontend'
                  ? 'underline text-black dark:text-white'
                  : ''
              )}
            >
              Front-end
            </Button>
            {/* <Button onClick={() => handleCreate()}>Create Post</Button> */}
            <Button
              className={cn(
                categoryType.name === 'backend'
                  ? 'underline text-black dark:text-white'
                  : ''
              )}
              onClick={() =>
                setCategoryType({ name: 'backend', slice1: 6, slice2: 12 })
              }
              variant={'link'}
            >
              Back-end
            </Button>
          </div>
        </div>
        <Spacer size={6} />
      </Col>
      {categoriesData
        ?.slice(categoryType.slice1, categoryType.slice2)
        .map((category, index) => {
          return (
            <Col key={index} lg={2} md={2} className='md:mb-6 sm:mb-6'>
              <Link href={`/blog?category=${category.slug}&page=1`}>
                <div
                  className={cn(
                    'p-6',
                    cardVariants({
                      variant: category.title.toLowerCase().replace('.', ''),
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
                </div>
              </Link>
            </Col>
          );
        })}
    </Row>
  );
}

export default PopularCategories;
