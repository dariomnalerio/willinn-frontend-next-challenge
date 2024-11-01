'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <main className='min-h-screen max-w-screen flex flex-col p-4 justify-center items-center gap-4 text-balance text-center'>
      <h2 className='text-4xl font-medium'>Página No Encontrada</h2>
      <p className='text-lg'>Lo sentimos, la página que buscas no existe.</p>
      <Button onClick={handleGoBack}>Regresar</Button>
    </main>
  );
}
