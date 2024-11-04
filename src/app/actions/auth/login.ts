'use server';
import { API_URL } from '@/utils';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const handleLogin = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    return { success: false, error: 'Error al ingresar, intente de nuevo' };
  }

  const data = await response.json();
  const cookieStore = await cookies();
  cookieStore.set('token', data.token);
  redirect('/dashboard');
};
