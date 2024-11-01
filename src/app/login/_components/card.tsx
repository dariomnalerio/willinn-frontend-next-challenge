import React from 'react';

type CardProps = {
  children: React.ReactNode;
};

export function Card({ children }: CardProps): React.ReactElement {
  return (
    <section className='max-w-[540px] w-full min-h-[438px] mx-auto md:bg-white md:shadow-md md:rounded-xl'>
      {children}
    </section>
  );
}
