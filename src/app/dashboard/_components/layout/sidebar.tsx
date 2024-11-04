'use client';
import React, { Suspense, useState } from 'react';
import { Logo } from '@/components/icons/logo-bg-white';
import { SidebarNav } from './sidebar-nav';
import { cn } from '@/utils';
import { BurgerMenu } from '@/components/icons/burger-menu';
import { Cross } from '@/components/icons/cross';

export function Sidebar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button className='md:hidden fixed top-4 left-4 z-50' onClick={handleToggle}>
        {isOpen && <Cross width={16} height={16} />}
        {!isOpen && <BurgerMenu width={16} height={16} />}
      </button>
      {isOpen && (
        <div
          className='fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 z-30 md:hidden'
          onClick={handleClose}
        ></div>
      )}
      <aside
        className={cn(
          'bg-white w-[227px] min-h-screen py-14 flex flex-col items-center fixed md:relative z-40 transition-transform duration-300 ease-in-out shadow',
          {
            'translate-x-0': isOpen,
            '-translate-x-full md:translate-x-0': !isOpen,
          },
        )}
      >
        <Logo width={150} height={34} />
        <Suspense fallback={null}>
          <SidebarNav />
        </Suspense>
      </aside>
    </>
  );
}
