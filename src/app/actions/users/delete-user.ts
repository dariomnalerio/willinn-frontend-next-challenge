"use server"
import { ApiReturnType } from "@/types"
import { API_URL } from "@/utils"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export const deleteUser = async ({ id }: { id: number }): Promise<ApiReturnType> => {
  const cookieStore = await cookies()
  // Token existence is checked at middleware level, so it's safe to assume it's always present
  const token = cookieStore.get('token')

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    return { success: false, data: null, error: 'Error al eliminar usuario' }
  }

  console.log(response)
  revalidateTag('users')
  return { success: true, data: null, error: null }
}