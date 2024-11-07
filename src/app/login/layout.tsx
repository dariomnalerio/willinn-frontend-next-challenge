import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Willinn Front-end Next Challenge',
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
