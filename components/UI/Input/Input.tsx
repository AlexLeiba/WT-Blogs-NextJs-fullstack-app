'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

import { Eye, EyeOff, Search } from 'lucide-react';
import { Spacer } from '../spacer/spacer';

type InputProps = {
  type: 'text' | 'password' | 'email' | 'textarea';
  inputType?: 'text' | 'password' | 'email' | 'textarea' | 'search';
  placeholder: string;
  className: string;
  label: string;
  error: string | undefined;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  defaultValue?: string;
  readOnly?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | any>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement | any>) => void;
} & Pick<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;
export function Input({
  type = 'text',
  placeholder,
  className,
  label,
  error = '',
  leftIcon,
  rightIcon,
  disabled = false,
  inputType = 'text',
  defaultValue,
  readOnly,
  value,
  onChange,
  onKeyDown,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <p className={cn([`${error && 'grow text-error-500'}`])}>{label}</p>
      <Spacer size={1} />
      <label
        className={cn([
          ' flex items-center gap-2 relative',
          `${error ? ' border-red-500' : ' flex items-center gap-2'}`,
        ])}
      >
        {leftIcon}
        {type == 'textarea' ? (
          <>
            <textarea
              value={value}
              onKeyDown={onKeyDown}
              onChange={onChange}
              {...props}
              disabled={disabled}
              className={cn(
                ' w-full text-black focus:outline-tertiary-400  grow',
                [`${error && ' text-error-500 border-error-500'}`, className]
              )}
              placeholder={placeholder}
              readOnly={readOnly}
            />
            {rightIcon}
          </>
        ) : (
          <input
            value={value}
            onKeyDown={onKeyDown}
            onChange={onChange}
            defaultValue={defaultValue ? defaultValue : ''}
            {...props}
            disabled={disabled}
            type={showPassword ? 'text' : type}
            className={cn(' w-full  grow', [
              `${error && ' text-error-500 border-error-500'}`,
              className,
            ])}
            placeholder={placeholder}
            readOnly={readOnly}
          />
        )}

        {inputType === 'search' && (
          <Search
            className={cn('absolute w-5 h-5 cursor-pointer left-2 top-3', [
              `${error && 'grow text-error-500'}`,
            ])}
          />
        )}
      </label>
      <Spacer size={1} />
      <p className='text-xs text-error-500'>{error}</p>

      {inputType === 'password' &&
        (showPassword ? (
          <EyeOff
            onClick={() => setShowPassword(false)}
            className={cn('absolute w-5 h-5 cursor-pointer top-0 right-0', [
              `${error && 'grow text-error-500'}`,
            ])}
          />
        ) : (
          <Eye
            onClick={() => setShowPassword(true)}
            className={cn('absolute w-5 h-5 cursor-pointer top-0 right-0', [
              `${error && 'grow text-error-500'}`,
            ])}
          />
        ))}
    </div>
  );
}
