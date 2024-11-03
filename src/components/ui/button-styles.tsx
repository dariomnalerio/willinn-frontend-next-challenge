import { cn } from '@/utils';

export type Variant = 'primary' | 'secondary' | 'link';

export const variantClasses = {
  primary: 'text-white bg-primary hover:bg-primary/90',
  secondary: 'text-white bg-secondary hover:bg-secondary/90',
  link: 'h-fit text-inherit hover:underline underline-offset-4',
};

type GetCommonClassesProps = {
  variant: Variant;
  className: string;
};

export const getCommonClasses = ({ variant, className }: GetCommonClassesProps) => {
  return cn(
    'h-[52px] rounded-[10px] px-4 disabled:opacity-50 transition-colors duration-300 flex justify-center items-center text-balance',
    variantClasses[variant],
    className,
  );
};
