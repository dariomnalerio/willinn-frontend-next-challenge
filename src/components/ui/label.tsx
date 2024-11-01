import { cn } from '@/utils';
import React from 'react';

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return <label className={cn('font-medium', className)} {...props} />;
};
