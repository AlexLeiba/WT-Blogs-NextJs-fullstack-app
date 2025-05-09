import { cva } from 'class-variance-authority';

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
          'dark:bg-tertiary-900 dark:hover:bg-tertiary-700',
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
