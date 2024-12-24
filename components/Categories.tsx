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
import { cardVariants } from '@/utils/categoriesColorVariants';

function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesShown, setCategoriesShown] = useState(6);

  const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function getCategories() {
      const categories = await fetch('http://localhost:3000/api/categories', {
        cache: 'no-cache',
      });

      if (!categories.ok) {
        return toast.error(categories.statusText);
      }
      const categoriesData = await categories.json(); //return data as JSON
      setCategoriesData(categoriesData);
    }
    getCategories();
  }, []);

  function handleShowHowManyCategoriesLeftWhenIsClosed(index: number) {
    if (localDB.allCategoriesType.length > 6 && !isOpen && index === 5) {
      return true;
    }
  }

  function handleViewMoreOrLess() {
    if (isOpen) {
      setCategoriesShown(6);
      setIsOpen(false);
    } else {
      setCategoriesShown(localDB.allCategoriesType.length);
      setIsOpen(true);
    }
  }
  return (
    <Row>
      <Col>
        <p className='text-baseline-400'>Discover by topic</p>
        <h5 className='text-xl font-bold'>Categories</h5>
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
          <Col key={index} lg={4} md={2} className='mb-6'>
            <Link href={`/blog?category=${category.slug}&page=1`}>
              <div
                className={cardVariants({
                  variant: category.title.toLowerCase().replace('.', ''),
                  size: 'medium',
                })}
              >
                <p className='text-xs text-black dark:text-white'>
                  {category.title}
                </p>

                {handleShowHowManyCategoriesLeftWhenIsClosed(index) && (
                  <div
                    onClick={() => {
                      setCategoriesShown(localDB.allCategoriesType.length);
                      setIsOpen(true);
                    }}
                    className=' absolute top-0 right-0 p-5 w-full h-4 bg-baseline-600 opacity-80 rounded-md flex justify-center items-center'
                  >
                    <p className='text-white'>
                      +{localDB.allCategoriesType.length - categoriesShown}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
}

export default Categories;
