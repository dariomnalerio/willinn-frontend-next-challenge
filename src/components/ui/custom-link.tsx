'use client';
import { cn } from '@/utils';
import React from 'react';
import { getCommonClasses, Variant, variantClasses } from './button-styles';
import Link from 'next/link';

interface CustomLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
}

export const CustomLink: React.FC<CustomLinkProps> = ({ children, variant = 'primary', className, href, ...props }) => {
  const commonClasses = getCommonClasses({
    variant,
    className: className ?? '',
  });

  return (
    <Link href={href} className={cn(commonClasses, variantClasses[variant], className)} {...props}>
      {children}
    </Link>
  );
};
