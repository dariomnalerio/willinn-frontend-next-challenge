'use client';
import { UserProvider } from '../../_stores/users-store';

export function TabContentContainer({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <UserProvider>
      <section className='md:p-11 flex-1'>{children}</section>
    </UserProvider>
  );
}
