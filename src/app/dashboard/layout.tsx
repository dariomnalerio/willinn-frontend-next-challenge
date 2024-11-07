import React from 'react';
import { Sidebar } from './_components/layout/sidebar';
import { TabContentContainer } from './_components/layout/tab-content-container';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '800'] });

export const metadata: Metadata = {
  title: 'Dashboard | Willinn Front-end Next Challenge',
};

type LayoutProps = {
  children: React.ReactNode;
};
export default function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className={`flex ${inter.className}`}>
      <Sidebar />
      <TabContentContainer>{children}</TabContentContainer>
    </div>
  );
}
