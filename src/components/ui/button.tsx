import { cn } from '@/utils';
import React from 'react';
import { getCommonClasses, variantClasses } from './button-styles';

type Variant = 'primary' | 'secondary' | 'link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', type, ...props }) => {
  const { className, ...rest } = props;

  const commonClasses = getCommonClasses({
    variant,
    className: className ?? '',
  });

  return (
    <button type={type} className={cn(commonClasses, variantClasses[variant], className)} {...rest}>
      {children}
    </button>
  );
};
