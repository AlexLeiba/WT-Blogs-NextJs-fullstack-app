import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from './tooltip';
import { Info, X } from 'lucide-react';

export const inputVariants = cva(
  [
    'flex w-full border border-baseline-300 bg-white text-base text-baseline-950 rounded',
    'placeholder:text-baseline-500',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all',
    'disabled:bg-baseline-50 disabled:border-baseline-100',
    // remove default behaviour in browsers
    'focus-within:outline-0',
    'focus-within:ring-2 focus-within:ring-accent-100',
    'focus-within:border-accent-600 focus-within:placeholder:text-transparent',
  ],
  {
    variants: {
      size: {
        medium: 'h-11 pl-4 pr-3',
      },
    },
  }
);

export type InputProps = {
  label?: string;
  error?: string;
  hintText?: string;
  iconHelpText?: string;
  iconLeft?: React.JSX.Element;
  iconRight?: React.JSX.Element;
  darkTooltip?: boolean;
  onRightIconClick?: () => void;
} & VariantProps<typeof inputVariants> &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> &
  Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

/**
 * A customizable input component.
 *
 * @component
 * @example
 * // Usage:
 * <Input
 *   label="Username"
 *   hintText="Enter your username"
 *   iconLeft={<Icon name="user" />}
 *   error="Invalid username"
 *   size="medium"
 *   type="text"
 *   darkTooltip={false}
 *   onRightIconClick={() => console.log('Right icon clicked')}
 *   name="username"
 *   value={username}
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 *
 * @param className - string: classes to be passed to component
 * @param label - string: the label for the input
 * @param hintText - string: the hint text to display below the input
 * @param iconHelpText - string: the help text to display in the tooltip for the help icon
 * @param iconLeft - reactNode: the icon to display on the left side of the input
 * @param iconRight - reactNode: the icon to display on the right side of the input
 * @param error - string: the error message to display below the input
 * @param size - string: the size of the input. Possible values: 'small', 'medium', 'large'
 * @param type - string: the type of the input. Possible values: 'text', 'password', 'email', 'number', 'search', etc
 * @param darkTooltip - boolean: whether to use a dark theme for the tooltip
 * @param onRightIconClick - function: the callback function to be called when the right icon is clicked
 * @param name - string: the name attribute of the input
 * @param value - string: the value of the input
 * @param onChange - function: (value: RPNInput.Country) => void: the callback function to be called when the input value changes
 *
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      hintText,
      iconHelpText,
      iconLeft,
      iconRight,
      error,
      size = 'medium',
      type = 'text',
      darkTooltip,
      onRightIconClick,
      ...props
    },
    ref
  ) => {
    return (
      <div className='relative w-full'>
        {label && (
          <>
            <p>{label}</p>
            <div className='h-1' />
          </>
        )}
        <div className='relative flex'>
          {iconLeft && (
            <div
              className={cn([
                'absolute top-1/2 flex -translate-y-1/2 items-center ',
                'pl-3',
              ])}
            >
              {React.cloneElement(iconLeft, {
                className: cn([
                  iconLeft.props.className,
                  'text-baseline-500',
                  'text-[20px]',
                ]),
              })}
            </div>
          )}
          <input
            type={type}
            autoComplete='off'
            className={cn(
              inputVariants({ size, className }),
              !!error &&
                'border-error-600 focus-visible:border-error-600 focus-visible:ring-2 focus-visible:ring-error-100',
              (!!iconHelpText || !!iconRight) && 'pr-10',
              iconLeft ? 'pl-11' : 'pl-4'
            )}
            ref={ref}
            {...props}
          />
          {type === 'search' && props.value && props.value !== '' && (
            <X
              size={16}
              className={cn([
                'cursor-pointer',
                'text-baseline-500',
                'absolute right-10 top-1/2 -translate-y-1/2',
                !!iconHelpText || !!iconRight ? 'right-10' : 'right-3',
              ])}
              onClick={onRightIconClick}
            />
          )}
          {iconRight && (
            <>
              {React.cloneElement(iconRight, {
                className: cn([
                  iconRight.props.className,
                  'text-baseline-950',
                  'text-[20px] cursor-pointer',
                  'absolute top-1/2 -translate-y-1/2',
                  !!iconHelpText ? 'right-10' : 'right-3',
                ]),
                onClick: () => {
                  if (onRightIconClick) {
                    onRightIconClick();
                  }
                },
              })}
            </>
          )}
          {iconHelpText && (
            <TooltipProvider delayDuration={250} disableHoverableContent>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info
                    size={20}
                    className={cn([
                      'cursor-help',
                      'absolute right-2 top-1/2 -translate-y-1/2',
                      'text-baseline-300',
                    ])}
                  />
                </TooltipTrigger>
                <TooltipContent dark={darkTooltip}>
                  {iconHelpText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {!!hintText && !error && (
          <p className={cn('mt-1 text-xs text-baseline-500')}>{hintText}</p>
        )}
        {error && <p className={cn('mt-1 text-xs text-error-600')}>{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
