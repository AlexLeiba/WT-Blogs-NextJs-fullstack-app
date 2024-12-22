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
      icon: 'https://i.imgur.com/t5m3n1K.png',
      variant: 'primary',
      link: '/',
    },
    {
      id: 2,
      name: 'Next.js',
      icon: 'https://i.imgur.com/t5m3n1K.png',
      variant: 'secondary',
      link: '/',
    },
    {
      id: 3,
      name: 'TypeScript',
      icon: 'https://i.imgur.com/t5m3n1K.png',
      variant: 'tertiary',
      link: '/',
    },
    {
      id: 4,
      name: 'Tailwind',
      icon: 'https://i.imgur.com/t5m3n1K.png',
      variant: 'error',
      link: '/',
    },
    {
      id: 5,
      name: 'CSS',
      icon: 'https://i.imgur.com/t5m3n1K.png',
      variant: 'success',
      link: '/',
    },
    {
      id: 6,
      name: 'JavaScript',
      icon: 'https://i.imgur.com/t5m3n1K.png',
      variant: 'baseline',
      link: '/',
    },
  ],
};
