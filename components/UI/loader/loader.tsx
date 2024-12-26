import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import React from 'react';

const loaderVariants = cva(
  [
    'absolute inset-0 animate-prixClipFix rounded-full border-2 border-solid border-accent-300',
  ],
  {
    variants: {
      variant: {
        primary: ['border-black dark:border-white'],
        baseline: ['border-white'],
        secondary: ['border-baseline-950'],
        tonal: ['border-accent-700'],
        outline: ['border-accent-700'],
        ghost: ['border-accent-700'],
        link: ['border-accent-600'],
        destructive: ['border-white'],
        // The following are used in other components
        flag: ['border-white'],
        date: ['border-white'],
      },
      disabled: {
        true: ['border-baseline-300'],
      },
      size: {
        large: 'h-6 w-6',
        medium: 'h-5 w-5',
      },
    },
  }
);
const loaderSizes = cva(
  ['animate-rotate relative inline-block h-8 w-8 rounded-full'],
  {
    variants: {
      size: {
        large: 'h-6 w-6',
        medium: 'h-5 w-5',
        // The following are used in other components
        flag: 'h-11 w-20 !pl-6',
        date: 'h-11 w-full pl-4',
      },
    },
  }
);

type LoaderProps = {
  variant:
    | 'link'
    | 'primary'
    | 'baseline'
    | 'secondary'
    | 'tonal'
    | 'outline'
    | 'ghost'
    | 'destructive'
    | 'flag'
    | 'date'
    | null;

  disabled?: boolean;
  size: 'flag' | 'date' | 'large' | 'medium' | null;
};
/**
 * Loader component.
 *
 * @param variant - - 'primary' | 'secondary' | 'tonal' | 'outline' | 'ghost' | 'link' | 'flag' | 'date': the variants of the loader based on button variant.
 * @param disabled - whether the loader is disabled based on button state.
 * @param size - 'large' | 'medium' | 'flag' | 'date': the size of the loader based on button size.
 */

export function Loader({ variant, disabled, size }: LoaderProps) {
  return (
    <div className='flex  items-center justify-center'>
      <div className={cn(loaderSizes({ size }))}>
        <div className={cn(loaderVariants({ variant, disabled }))}></div>
      </div>
    </div>
  );
}
