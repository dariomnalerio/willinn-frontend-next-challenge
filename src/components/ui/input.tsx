import { cn } from '@/utils';
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      className={cn(
        'h-[52px] rounded-[10px] border border-gray-300 px-3 py-1 focus:outline-gray-200 focus:outline-offset-2 disabled:opacity-50',
        className,
      )}
      {...props}
    />
  );
};
