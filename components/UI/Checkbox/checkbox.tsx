'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

/**
 * Checkbox component
 *
 * @component
 * The component receives both label and customLabel props, but only one of them can be used at a time.
 * CustomLabel is a ReactNode, so it can be used to render any custom content. It is recommended to use a paragraph tag to wrap the custom content.
 * The styling for the customLabel is already done in the component, so it is not necessary to add any additional styling unless if you want to override the default styling.
 *
 * If both label and customLabel are provided, customLabel has precedence over label.
 *
 * @param className - string: classes to be passed to component
 * @param helpText - string | undefined: additional information or guidance to users
 * @param label - string | undefined: the label to be passed to component
 * @param customLabel - reactNode: the customLabel to be passed to component
 * @param error - string | undefined: the error to be passed to component
 * @param name - string | undefined: the name to be passed to component
 * @param asChild - false as default: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param defaultChecked - boolean | 'indeterminate': the checked state of the checkbox when it is initially rendered, use when you do not need to control its checked state
 * @param checked - boolean | 'indeterminate': the controlled checked state of the checkbox, must be used with onCheckedChange
 * @param onCheckedChange - function: (checked: boolean | 'indeterminate') => void: event handler called when the checked state of the checkbox changes
 * @param disabled - boolean: when true, prevents the user from interacting with the checkbox
 * @param required - boolean: when true, indicates that the user must check the checkbox before the owning form can be submitted
 * @param value - string | undefined : the value given as data when submitted with a name
 * @param [data-state] - 'checked' | 'unchecked' | 'indeterminate'
 * @param [data-disabled] - present when disabled
 *
 * [Radix checkbox](https://www.radix-ui.com/primitives/docs/components/checkbox)
 */

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    label?: string;
    customLabel?: React.ReactNode;
    helpText?: string;
    error?: string;
  }
>(({ className, label, customLabel, helpText, name, error, ...props }, ref) => (
  <div className='items-top group flex space-x-3 items-center'>
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        // accessibility
        'focus-visible:ring-2 focus-visible:ring-offset-2',
        'size-5 shrink-0 rounded focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=unchecked]:border-2 data-[state=unchecked]:border-baseline-500 data-[state=checked]:bg-accent-600 data-[state=checked]:text-white lg:hover:border-baseline-400',
        className
      )}
      disabled={props.disabled}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('text-current flex items-center justify-center')}
      >
        <span className='sr-only'>Check</span>

        <Check
          width={20}
          height={20}
          className=' text-black dark:text-white border-[1px] rounded-md'
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    <div className='flex flex-col gap-1 leading-none'>
      {customLabel ? (
        <Slot className='truncate text-base font-medium'>{customLabel}</Slot>
      ) : label ? (
        <p className='text-xl font-bold dark:text-white'>{label}</p>
      ) : null}
      {error ? (
        <p className={cn('text-xs text-error-600')}>{error}</p>
      ) : helpText ? (
        <p
          className={cn(
            'text-xs text-baseline-500',
            props.disabled && 'cursor-not-allowed text-baseline-300'
          )}
        >
          {helpText}
        </p>
      ) : null}
    </div>
  </div>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
