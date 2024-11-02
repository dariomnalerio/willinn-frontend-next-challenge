import React from 'react';
import { Logo } from '@/components/icons/logo-bg-white';
import { SidebarNav } from './sidebar-nav';

export function Sidebar(): JSX.Element {
  return (
    <>
      <aside className='bg-white w-[227px] h-screen py-14 flex flex-col items-center shadow'>
        <Logo width={150} height={34} />
        <SidebarNav />
      </aside>
    </>
  );
}
