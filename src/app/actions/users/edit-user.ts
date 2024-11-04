'use server';
import { ApiReturnType } from '@/types';
import { EditUser } from '@/app/dashboard/_types';
import { API_URL } from '@/utils';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const editUser = async ({
  email,
  firstName,
  lastName,
  password,
  id,
}: EditUser & { id: number }): Promise<ApiReturnType> => {
  const cookieStore = await cookies();
  // Token existence is checked at middleware level, so it's safe to assume it's always present
  const token = cookieStore.get('token');

  const name = `${firstName} ${lastName}`;

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, name, password }),
  });

  if (!response.ok) {
    return { success: false, data: null, error: 'Error al editar usuario' };
  }

  revalidateTag('users');
  return { success: true, data: null, error: null };
};
