import { cn } from '@/utils';

export type Variant = 'primary' | 'secondary' | 'link';

export const variantClasses = {
  primary: 'text-white bg-primary hover:bg-primary/85',
  secondary: 'bg-secondary text-white',
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
