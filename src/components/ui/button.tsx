import { cn } from '@/utils';
import React from 'react';
import { getCommonClasses } from './button-styles';

type Variant = 'primary' | 'secondary' | 'link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
}

export const Button: React.FC<ButtonProps> = ({ children, variant: variantProp, type, ...props }) => {
  const { className, ...rest } = props;
  const variant = variantProp ?? 'primary';

  const commonClasses = getCommonClasses({
    variant,
    className: className ?? '',
  });

  return (
    <button type={type} className={cn(commonClasses, className)} {...rest}>
      {children}
    </button>
  );
};
