import { link } from 'fs';

export const localDB = {
  posts: [
    {
      id: 1,
      title: 'How to build a blog with ',
      description:
        'In this tutorial, we will learn how to build a blog with Next.js and TypeScript. We will cover the basics of Next.js, including routing, data fetching, and styling. We will also learn how to use TypeScript to ensure type safety and catch errors at compile time.',
      image: 'https://i.imgur.com/t5m3n1K.png',
      author: 'Alex',
      date: '2023-01-01',
      category: 'primary',
      link: '/',
    },
    {
      id: 2,
      title: ' and TypeScript',
      description:
        'In this tutorial, we will learn how to build a blog with Next.js and TypeScript. We will cover the basics of Next.js, including routing, data fetching, and styling. We will also learn how to use TypeScript to ensure type safety and catch errors at compile time.',
      image: 'https://i.imgur.com/t5m3n1K.png',
      author: 'Alex',
      date: '2023-01-01',
      category: 'secondary',
      link: '/',
    },
    {
      id: 3,
      title: ' Next.js and TypeScript',
      description:
        'In this tutorial, we will learn how to build a blog with Next.js and TypeScript. We will cover the basics of Next.js, including routing, data fetching, and styling. We will also learn how to use TypeScript to ensure type safety and catch errors at compile time.',
      image: 'https://i.imgur.com/t5m3n1K.png',
      author: 'Alex',
      date: '2023-01-01',
      category: 'tertiary',
      link: '/',
    },
    {
      id: 4,
      title: 'TypeScript',
      description:
        'In this tutorial, we will learn how to build a blog with Next.js and TypeScript. We will cover the basics of Next.js, including routing, data fetching, and styling. We will also learn how to use TypeScript to ensure type safety and catch errors at compile time.',
      image: 'https://i.imgur.com/t5m3n1K.png',
      author: 'Alex',
      date: '2023-01-01',
      category: 'error',
      link: '/',
    },
  ],
  categoryType: [
    {
      id: 1,
      name: 'React',
      link: '/',
      variant: 'primary',
      icon: '/categories/react.svg',
    },
    {
      id: 2,
      name: 'Next.js',
      link: '/',
      variant: 'secondary',
      icon: '/categories/NextJS.svg',
    },
    {
      id: 3,
      name: 'TypeScript',
      link: '/',
      variant: 'tertiary',
      icon: '/categories/TypeScript.svg',
    },
    {
      id: 4,
      name: 'Tailwind',
      link: '/',
      variant: 'error',
      icon: '/categories/tailwind.svg',
    },
    {
      id: 5,
      name: 'CSS',
      link: '/',
      variant: 'success',
      icon: '/categories/CSS.svg',
    },
    {
      id: 6,
      name: 'JavaScript',
      link: '/',
      variant: 'baseline',
      icon: '/categories/JavaScript.svg',
    },
  ],
  allCategoriesType: [
    {
      id: 1,
      name: 'React',
      link: '/',
      variant: 'primary',
      icon: '/categories/react.svg',
    },
    {
      id: 2,
      name: 'Next.js',
      link: '/',
      variant: 'secondary',
      icon: '/categories/NextJS.svg',
    },
    {
      id: 3,
      name: 'TypeScript',
      link: '/',
      variant: 'tertiary',
      icon: '/categories/TypeScript.svg',
    },
    {
      id: 4,
      name: 'Tailwind',
      link: '/',
      variant: 'error',
      icon: '/categories/tailwind.svg',
    },
    {
      id: 5,
      name: 'CSS',
      link: '/',
      variant: 'success',
      icon: '/categories/CSS.svg',
    },
    {
      id: 6,
      name: 'JavaScript',
      link: '/',
      variant: 'baseline',
      icon: '/categories/JavaScript.svg',
    },
    {
      id: 12,
      name: 'HTML',
      link: '/',
      variant: 'baseline',
      icon: '/categories/HTML.svg',
    },
    {
      id: 7,
      name: 'Node.js',
      link: '/',
      variant: 'primary',
      icon: '/categories/NodeJs.svg',
    },
    {
      id: 8,
      name: 'Express.js',
      link: '/',
      variant: 'secondary',
      icon: '/categories/ExpressJS.svg',
    },
    {
      id: 9,
      name: 'Git',
      link: '/',
      variant: 'tertiary',
      icon: '/categories/GIT.svg',
    },
    {
      id: 10,
      name: 'GraphQL',
      link: '/',
      variant: 'error',
      icon: '/categories/GraphQL.svg',
    },
    {
      id: 11,
      name: 'JWT',
      link: '/',
      variant: 'success',
      icon: '/categories/JWT.svg',
    },
  ],
};

export const commentsMockedData = [
  {
    id: 1,
    name: 'Alex',
    comment:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    date: '2023-01-01',
    avatar: '/colorful.jpeg',
  },
  {
    id: 2,
    name: 'Alex',
    comment:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    date: '2023-01-01',
    avatar: '/colorful.jpeg',
  },
  {
    id: 3,
    name: 'Alex',
    comment:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatibus.',
    date: '2023-01-01',
    avatar: '/colorful.jpeg',
  },
];
