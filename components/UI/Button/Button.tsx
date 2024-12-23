import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Loader } from '../loader';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center whitespace-nowrap font-medium',
    'disabled:pointer-events-none disabled:bg-baseline-50 disabled:text-baseline-400 rounded',
    // accessibility
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'transition-colors',
  ],
  {
    variants: {
      variant: {
        primary: ['bg-tertiary-500 text-white ', 'lg:hover:bg-tertiary-600'],
        baseline: ['bg-baseline-950', 'lg:hover:bg-baseline-900', 'text-white'],
        secondary: [
          'bg-baseline-100 text-baseline-950 dark:text-white hover:bg-baseline-200 ',
          'dark:bg-baseline-900 dark:hover:bg-baseline-200 dark:hover:text-black ',
        ],
        tonal: [
          'bg-primary-100 text-primary-700',
          'lg:hover:bg-primary-50 lg:hover:text-primary-600',
        ],
        outline: [
          'bg-transparent border-primary-700 text-primary-700',
          'lg:hover:border-primary-600 lg:hover:text-primary-600',
        ], // Look at compoundVariants for border width
        ghost: ['bg-transparent text-primary-700', 'lg:hover:text-primary-600'],
        link: [
          'bg-transparent text-tertiary-700',
          'lg:hover:underline',
          'disabled:bg-transparent',
        ],
        destructive: [
          'bg-error-600 text-white',
          'lg:hover:bg-error-500',
          'disabled:bg-error-300',
        ],
        // The following are used in other components
        flag: [
          'bg-white text-baseline-950 border border-baseline-300 rounded-r-none',
        ],
        date: ['bg-white border border-baseline-300 text-baseline-950'],
      },
      size: {
        large: 'h-14 px-12 text-xl',
        medium: 'h-11 px-6 text-base',
        // The following are used in other components
        flag: 'h-11 w-20 !pl-6',
        date: 'h-11 w-full pl-4',
      },
    },
    compoundVariants: [
      {
        variant: 'outline',
        size: 'large',
        className: 'border-2',
      },
      {
        variant: 'outline',
        size: 'medium',
        className: 'border-[1.5px]',
      },
      {
        variant: 'link',
        size: 'large',
        className: 'p-0 h-fit',
      },
      {
        variant: 'link',
        size: 'medium',
        className: 'p-0 h-fit',
      },
    ],
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.JSX.Element;
  rightIcon?: React.JSX.Element;
  loading?: boolean;
}

/**
 * Button component
 *
 * @param className - classes to be passed to component
 * @param variant - 'primary' | 'secondary' | 'tonal' | 'outline' | 'ghost' | 'link' | 'flag' | 'date': the variants of the button, flag and date are used in other components
 * @param size - 'large' | 'medium' | 'flag' | 'date': the sizes of the button, flag and date are used in other components
 * @param leftIcon - the icon will be place in the left side before the button
 * @param rightIcon - the icon will be place in the right side after the button
 * @param type -  'submit' | 'reset' | 'button' | undefined: the types of the button
 * @param disabled - boolean: when true, prevents the user from interacting with the accordion and all its items
 * @param loading - boolean: when true, shows a loader in the button
 *
 **/

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'medium',
      leftIcon,
      rightIcon,
      disabled,
      loading,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {loading && (
          <Loader variant={variant} disabled={disabled} size={size} />
        )}

        {!loading && (
          <>
            {leftIcon && (
              <span
                className={cn([
                  `${size === 'medium' ? 'mr-2 h-5' : 'mr-3 h-6'}`,
                ])}
              >
                {React.cloneElement(leftIcon, {
                  className: `${leftIcon.props.className} ${
                    size === 'medium' ? 'text-[20px]' : 'text-[24px]'
                  }`,
                })}
              </span>
            )}
            {props.children}
            {rightIcon && (
              <span
                className={cn([
                  `${size === 'medium' ? 'ml-2 h-5' : 'ml-3 h-6'}`,
                ])}
              >
                {React.cloneElement(rightIcon, {
                  className: `${rightIcon.props.className} ${
                    size === 'medium' ? 'text-[20px]' : 'text-[24px]'
                  }`,
                })}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
