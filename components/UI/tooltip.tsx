'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/lib/utils';

/**
 * TooltipProvider component
 *
 * @param delayDuration - number by default 700: the duration from when the mouse enters a tooltip trigger until the tooltip opens
 * @param skipDelayDuration - number by default 300: how much time a user has to enter another trigger without incurring a delay again
 * @param disableHoverableContent - boolean: prevents Tooltip.Content from remaining open when hovering, disabling this has accessibility consequences
 *
 * [Radix tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip)
 */

const TooltipProvider = TooltipPrimitive.Provider;

/**
 * Tooltip component
 *
 * @param defaultOpen - boolean: the open state of the tooltip when it is initially rendered, use when you do not need to control its open state
 * @param open - boolean: the controlled open state of the tooltip, must be used in conjunction with onOpenChange
 * @param onOpenChange - function: (open: boolean) => void: event handler called when the open state of the tooltip changes
 * @param delayDuration - number by default 700: override the duration given to the `Provider` to customise the open delay for a specific tooltip
 * @param disableHoverableContent - boolean: prevents Tooltip.Content from remaining open when hovering, disabling this has accessibility consequences, inherits from Tooltip.Provider
 *
 * [Radix tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip)
 */

const Tooltip = TooltipPrimitive.Root;

/**
 * TooltipTrigger component
 *
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param [data-state] - 	'closed' | 'delayed-open' | 'instant-open'
 *
 * [Radix tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip)
 */

const TooltipTrigger = TooltipPrimitive.Trigger;

/**
 * TooltipContent component
 *
 * @param className - string: classes to be passed to component
 * @param dark - boolean | undefined
 * @param asChild - boolean by default false: change the default rendered element for the one passed as a child, merging their props and behavior
 * @param aria-label - string: by default, screenreaders will announce the content inside the component, if this is not descriptive enough, or you have content that cannot be announced, use aria-label as a more descriptive labe
 * @param onEscapeKeyDown - function: (event: KeyboardEvent) => void: event handler called when the escape key is down
 * @param onPointerDownOutside - function: (event: PointerDownOutsideEvent) => void: event handler called when a pointer event occurs outside the bounds of the component
 * @param forceMount - boolean: used to force mounting when more control is needed
 * @param side - 'top' | 'right' | 'bottom' | 'left' by default top: the preferred side of the trigger to render against when open, will be reversed when collisions occur and avoidCollisions is enabled
 * @param sideOffset - number by default 0: the distance in pixels from the trigger
 * @param align - 'start' | 'center' | 'end' by default center: the preferred alignment against the trigger, may change when collisions occur
 * @param alignOffset - number by default 0: an offset in pixels from the "start" or "end" alignment options
 * @param avoidCollisions - boolean by default true: when true, overrides the side andalign preferences to prevent collisions with boundary edges
 * @param collisionBoundary - boundary: Element | null | Array<Element | null> by default []: the element used as the collision boundary, by default this is the viewport, though you can provide additional element(s) to be included in this check.
 * @param collisionPadding - number | padding: number | Partial<Record<Side, number>> by default 0: the distance in pixels from the boundary edges where collision detection should occur
 * @param arrowPadding - number by default 0: the padding between the arrow and the edges of the content, if your content has border-radius, this will prevent it from overflowing the corners
 * @param sticky - 'partial' | 'always' by default partial: the sticky behavior on the align axis. "partial" will keep the content in the boundary as long as the trigger is at least partially in the boundary whilst "always" will keep the content in the boundary regardless
 * @param hideWhenDetached - boolean by default false
 * @param [data-state] - 	'closed' | 'delayed-open' | 'instant-open'
 * @param [data-side] - 	'left' | 'right' | 'bottom' | 'top'
 * @param [data-state] - 	'start' | 'end' | 'center'
 *
 * [Radix tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip)
 */

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    dark?: boolean;
  }
>(({ className, sideOffset = 4, dark, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded border bg-baseline-50 p-3 text-xs text-baseline-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      dark && 'border-none bg-baseline-950 text-white',
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
