import React from 'react';
import { Card } from './_components/card';
import { LoginForm } from './_components/login-form';
import { Logo } from '@/components/icons/logo-bg';

export default function LoginPage(): React.ReactElement {
  return (
    <main className='flex flex-col pt-20 md:pt-0 md:justify-center items-center gap-10 min-h-screen'>
      <Logo width={150} height={34} className='ml-4' />
      <Card>
        <LoginForm />
      </Card>
    </main>
  );
}
