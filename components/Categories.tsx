'use client';
import React, { useState } from 'react';
import { localDB } from '@/consts/localDB';
import { Col, Row } from './UI/Grid';
import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { Spacer } from './UI/spacer/spacer';
import { Button } from './UI/Button/Button';

const cardVariants: any = cva(
  [
    'flex p-5 w-full h-4 items-center justify-center rounded-md relative ',
    // accessibility
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-100  hover:bg-primary-300',
          ' dark:bg-primary-900 dark:hover:bg-primary-700',
        ],
        baseline: [
          'bg-baseline-100 hover:bg-baseline-300',
          'dark:bg-baseline-900',
        ],
        secondary: [
          'bg-secondary-100  hover:bg-secondary-300',
          ' dark:bg-secondary-900 dark:hover:bg-secondary-700',
        ],
        tertiary: [
          'bg-tertiary-100  hover:bg-tertiary-300',
          ' dark:bg-tertiary-900 dark:hover:bg-tertiary-700',
        ],
        error: [
          'bg-error-100  hover:bg-error-300',
          ' dark:bg-error-900 dark:hover:bg-error-700',
        ],
        success: [
          'bg-success-100  hover:bg-success-300',
          ' dark:bg-success-900 dark:hover:bg-success-700',
        ],
      },
    },
  }
);

function Categories() {
  const [isOpen, setIsOpen] = useState(false);
  const [categoriesShown, setCategoriesShown] = useState(6);

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
      {localDB.allCategoriesType
        .slice(0, categoriesShown)
        .map((category, index) => {
          return (
            <Col key={index} lg={4} md={2} className='mb-6 relative'>
              <Link href={category.link}>
                <div className={cardVariants({ variant: category.variant })}>
                  <p className='text-xs text-black dark:text-white'>
                    {category.name}
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
