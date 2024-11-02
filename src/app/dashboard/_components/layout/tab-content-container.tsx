'use client';
import { UserProvider } from '../../_stores/users-store';

export function TabContentContainer({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <UserProvider>
      <section className='p-11'>{children}</section>
    </UserProvider>
  );
}
