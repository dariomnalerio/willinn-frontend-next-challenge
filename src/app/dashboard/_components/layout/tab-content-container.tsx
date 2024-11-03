'use client';
import { UserProvider } from '../../_stores/users-store';

export function TabContentContainer({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <UserProvider>
      <section className='md:p-11'>{children}</section>
    </UserProvider>
  );
}
