'use client';

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

import { cn } from '@/lib/utils';
import { X } from 'lucide-react';
import { Button } from '../Button/Button';
import { Checkbox } from '../Checkbox/checkbox';

/**
 * Dialog component
 *
 * @param defaultOpen - boolean: the open state of the dialog when it is initially rendered
 * @param open - boolean: the controlled open state of the dialog, must be used with onOpenChange
 * @param onOpenChange - function: (open: boolean) => void: event handler called when the open state of the dialog changes
 * @param modal - boolean by default true: when set to true, interaction with outside elements will be disabled and only dialog content will be visible to screen readers
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const Dialog = DialogPrimitive.Root;

/**
 * DialogTrigger component
 *
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param [data-state] - 'open' | 'closed'
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const DialogTrigger = DialogPrimitive.Trigger;

/**
 * DialogPortal component
 *
 * @param forceMount - boolean: used to force mounting when more control is needed
 * @param container - jsxElemnt: specify a container element to portal the content into
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const DialogPortal = DialogPrimitive.Portal;

/**
 * DialogClose component
 *
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const DialogClose = DialogPrimitive.Close;

/**
 * DialogOverlay component
 *
 * @param className - string: classes to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param forceMount - boolean: used to force mounting when more control is needed
 * @param [data-state] - 'open' | 'closed'
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-baseline-950 opacity-80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/**
 * DialogContent component
 *
 * @param className - string: classes to be passed to component
 * @param children - ReactNode: children to be passed to component
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param forceMount - boolean: used to force mounting when more control is needed
 * @param onOpenAutoFocus - function: (event: Event) => void: event handler called when focus moves into the component after opening
 * @param onCloseAutoFocus - function: (event: Event) => void: event handler called when focus moves to the trigger after closing
 * @param onEscapeKeyDown - function: (event: KeyboardEvent) => void: event handler called when the escape key is down
 * @param onPointerDownOutside - function: (event: PointerDownOutsideEvent) => void: event handler called when a pointer event occurs outside the bounds of the component
 * @param onInteractOutside -function: (event: React.FocusEvent | MouseEvent | TouchEvent) => void: event handler called when a pointer event occurs outside the bounds of the component
 * @param [data-state] - 'open' | 'closed'
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-[50%] top-[50%] z-50 w-[400px] translate-x-[-50%] translate-y-[-50%] space-y-4 rounded border border-baseline-100 bg-white p-6 shadow-40 duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className='absolute right-4 top-4 size-10 rounded-sm text-baseline-300 ring-offset-background hover:text-baseline-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent-50 data-[state=open]:text-baseline-300'>
        <X size={20} />
        <span className='sr-only'>Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/**
 * DialogHeader component
 *
 * @param className - string: classes to be passed to component
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const DialogHeader = ({
  className,
  icon,
  position = 'left-aligned',
  title,
  variant = 'baseline',
  description,
  ...props
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'position'> & {
  icon: React.JSX.Element;
  position: 'left-aligned' | 'center-aligned' | 'horizontal-left-aligned';
  title: string;
  variant?: 'baseline' | 'accent' | 'destructive';
  description: string;
}) => (
  <div
    className={cn(
      'flex flex-col gap-4',
      position === 'center-aligned' && 'items-center text-center',
      position === 'horizontal-left-aligned' && 'flex-row items-start',
      className
    )}
    {...props}
  >
    <div
      className={cn(
        'flex size-11 flex-shrink-0 items-center justify-center rounded-full bg-baseline-50',
        variant === 'destructive' && 'bg-error-50',
        variant === 'accent' && 'bg-accent-50'
      )}
    >
      {React.cloneElement(icon, {
        className: cn(
          icon.props.className,
          'text-baseline-950 text-[20px]',
          variant === 'destructive' && 'text-error-600',
          variant === 'accent' && 'text-accent-600'
        ),
      })}
    </div>
    <div className='gap flex flex-col gap-1'>
      <h5 className='text-xs font-semibold'>{title}</h5>
      <DialogTitle className='text-xs hidden'>{title}</DialogTitle>
      <DialogPrimitive.Description>{description}</DialogPrimitive.Description>
    </div>
  </div>
);
DialogHeader.displayName = 'DialogHeader';

/**
 * DialogFooter component
 *
 * @param className - string: classes to be passed to component
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const DialogFooter = ({
  className,
  customConfirmButtonText,
  position = 'horizontal-fill',
  variant = 'accent',
  onCancel,
  onConfirm,
  ...props
}: React.HTMLAttributes<HTMLDivElement> &
  (
    | {
        position: 'horizontal-fill' | 'vertical-fill';
        customConfirmButtonText?: string;
        variant?: 'accent' | 'destructive';
        onCancel: () => void;
        onConfirm: () => void;
      }
    | {
        position: 'right-aligned';
        customConfirmButtonText?: string;
        variant?: 'accent' | 'destructive';
        onCancel: () => void;
        onConfirm: () => void;
        onCheckboxCheckedChange: (checked: boolean) => void;
      }
  )) => (
  <div
    className={cn(
      'flex flex-col pt-8',
      position === 'right-aligned' &&
        'flex-row items-center justify-between gap-3 sm:flex-col-reverse',
      className
    )}
    {...props}
  >
    {position === 'right-aligned' && 'onCheckboxCheckedChange' in props && (
      <div>
        <Checkbox
          label="Don't show this again"
          onCheckedChange={props.onCheckboxCheckedChange}
        />
      </div>
    )}
    <div
      className={cn(
        'flex w-full gap-3',
        position !== 'horizontal-fill' && 'sm:flex-col-reverse'
      )}
    >
      <Button variant='secondary' className='w-full' onClick={onCancel}>
        Cancel
      </Button>
      <Button
        variant={variant === 'destructive' ? 'destructive' : 'primary'}
        className='w-full'
        onClick={onConfirm}
      >
        {customConfirmButtonText || 'Confirm'}
      </Button>
    </div>
  </div>
);
DialogFooter.displayName = 'DialogFooter';

/**
 * DialogTitle component
 *
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param className - string: classes to be passed to component
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/**
 * DialogDescription component
 *
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param className - string: classes to be passed to component
 *
 * [Radix dialog](https://www.radix-ui.com/primitives/docs/components/dialog)
 */

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-baseline-300', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
};
