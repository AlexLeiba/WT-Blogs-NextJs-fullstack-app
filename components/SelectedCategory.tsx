import React from 'react';
import { Col, Row } from './UI/Grid';
import { cardVariants } from '@/utils/categoriesColorVariants';
import Image from 'next/image';

function SelectedCategory({ categorySlug }: { categorySlug: string }) {
  const filteredCategoryBySlug = categoriesData.filter(
    (cat) => cat.slug === categorySlug
  )[0];

  return (
    <Row>
      <Col>
        <p className='text-xl dark:text-white '>Selected category</p>
      </Col>

      <Col lg={12} md={4} className='md:mb-6 sm:mb-6'>
        <div
          className={cardVariants({
            variant: filteredCategoryBySlug?.title
              ?.toLowerCase()
              .replace('.', '')
              .replace('-', ''),
            size: 'large',
          })}
        >
          <p className='text-xl font-bold text-black dark:text-white'>
            {filteredCategoryBySlug?.title}
          </p>
          {filteredCategoryBySlug?.img && (
            <Image
              src={filteredCategoryBySlug?.img}
              alt={filteredCategoryBySlug?.title}
              width={100}
              height={100}
              className='  w-8 h-8'
            />
          )}
        </div>
      </Col>
    </Row>
  );
}

export default SelectedCategory;

const categoriesData = [
  {
    id: 'cm528jaou00001yj9hqh0rnar',
    slug: 'reactjs',
    title: 'React.js',
    img: '/categories/React.svg',
    domain: 'frontend',
  },
  {
    id: 'cm528r71100011yj9zzakx1xf',
    slug: 'nextjs',
    title: 'Next.js',
    img: '/categories/NextJS.svg',
    domain: 'frontend',
  },
  {
    id: 'cm529x85900021yj9grjsi1d1',
    slug: 'javascript',
    title: 'JavaScript',
    img: '/categories/JavaScript.svg',
    domain: 'frontend',
  },
  {
    id: 'cm52a09bi00031yj9nhnbycno',
    slug: 'tailwind',
    title: 'Tailwind',
    img: '/categories/tailwind.svg',
    domain: 'frontend',
    Posts: [],
  },
  {
    id: 'cm52a09bj00041yj989jyqbn0',
    slug: 'css',
    title: 'CSS',
    img: '/categories/CSS.svg',
    domain: 'frontend',
  },
  {
    id: 'cm52a09bj00051yj9nifrpxx3',
    slug: 'typescript',
    title: 'Typescript',
    img: '/categories/TypeScript.svg',
    domain: 'frontend',
  },
  {
    id: 'cm52apbhc00061yj9cvkgcc26',
    slug: 'nodejs',
    title: 'Node.js',
    img: '/categories/NodeJS.svg',
    domain: 'backend',
  },
  {
    id: 'cm52apbhd00071yj99baqvisi',
    slug: 'expressjs',
    title: 'Express.js',
    img: '/categories/ExpressJS.svg',
    domain: 'backend',
  },
  {
    id: 'cm52apbhd00081yj9bfxj8f1r',
    slug: 'graphql',
    title: 'GraphQL',
    img: '/categories/GraphQL.svg',
    domain: 'backend',
    Posts: [],
  },
  {
    id: 'cm52apbhd00091yj93oe2kpj8',
    slug: 'prisma',
    title: 'Prisma',
    img: '/categories/prisma.svg',
    domain: 'backend',
    Posts: [],
  },
  {
    id: 'cm52apbhd000a1yj9ui4nvxih',
    slug: 'mongodb',
    title: 'MongoDB',
    img: '/categories/mongodb.svg',
    domain: 'backend',
    Posts: [],
  },
  {
    id: 'cm52apbhe000b1yj9svevx7zs',
    slug: 'nextauth',
    title: 'NextAuth',
    img: '/categories/nextauth.svg',
    domain: 'backend',
    Posts: [],
  },
  {
    id: 'cm5kwddtj00001yuajvfdla2c',
    slug: 'frontend',
    title: 'Front-End',
    img: '/categories/front-end.svg',
    domain: 'frontend',
  },
  {
    id: 'cm5kwddtk00011yuaxx5mlego',
    slug: 'backend',
    title: 'Back-End',
    img: '/categories/back-end.svg',
    domain: 'backend',
    Posts: [],
  },
  {
    id: 'cm5kwddtk00021yualrxnbcmb',
    slug: 'html',
    title: 'HTML',
    img: '/categories/html.svg',
    domain: 'frontend',
    Posts: [],
  },
  {
    id: 'cm5kwddtl00031yuaub9dzley',
    slug: 'sql',
    title: 'SQL',
    img: '/categories/sql.svg',
    domain: 'backend',
    Posts: [],
  },
  {
    id: 'cm5kwddtl00041yua5cgyjjen',
    slug: 'database',
    title: 'Database',
    img: '/categories/database.svg',
    domain: 'backend',
    Posts: [],
  },
  {
    id: 'cm5kwddtl00051yua9dwc1ozj',
    slug: 'auth',
    title: 'Auth',
    img: '/categories/auth.svg',
    domain: 'backend',
    Posts: [],
  },
];
